import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(400, "Unauthorized Access");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Unable to generate tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("Request received at register")
  const { firstname, lastname, username, email, password, role, address } = req.body
  const required_elements = [firstname, lastname, username, email, password]
  for (let i = 0; i < required_elements.length; i++) {
    if (!required_elements[i]?.trim()) 
      throw new ApiError(400, `${required_elements[i]} is required to register the user`);
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("Bypassed existingUser")

  if (existingUser) 
      throw new ApiError(400, "An account with this email already exists. Please login or use a different email.");
  
  console.log("Left from register")
  return res.status(200).json(new ApiResponse(200, {}, "Proceed to OTP verification"));
});

const registerAfterVerification = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, role, address } = req.body;
  const user = await User.create({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: password,
    role: role,
    address: address,
  });

  const createdUser = await User.findById(user._id).select("-refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "User record has been created after final verification"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) 
    throw new ApiError(400, "Please enter username or email to login")
  if (!password) 
    throw new ApiError(400, "Please enter password")
  try {
    const user = await User.findOne({ $or: [{ username: username }, { email: username }] })
    if (!user) 
      throw new ApiError(400, "User hasn't been registered, please register and then login")
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) 
      throw new ApiError(400, "Incorrect password")
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };
    res.cookie("accessToken", accessToken, cookieOptions)
    return res.status(200).json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken },"User logged in successfully"))
  } catch (error) {
    console.error("An error occurred during login:", error)
    throw new ApiError(500, "Unable to login. Please try again.")
  }
});

//verifyJWT
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true })

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200).clearCookie("accessToken", options).json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingToken = req.cookies?.accessToken || req.body.accessToken;
    if (!incomingToken) 
      throw new ApiError(400, "Unauthorized request")
    
    const decodedToken = jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id);
    if (!user) 
      throw new ApiError(400, "Invalid access token");

    const newAccessToken = await user.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", newAccessToken, options).json(new ApiResponse(200, {}, "Access token refreshed successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Unable to refresh access token");
  }
});

//verifyJWT
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!oldPassword) {
    throw new ApiError(400, "Please enter old password");
  }
  if (!newPassword) {
    throw new ApiError(400, "Please enter new password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect old password");
  }

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new ApiError(
      400,
      "Password is invalid. It must contain at least one digit, one lowercase letter, one uppercase letter, one special character, no spaces, and be 8-16 characters long."
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Password Changed Successfully"));
});

export {
  generateAccessAndRefreshTokens,
  registerUser,
  registerAfterVerification,
  loginUser,
  changeCurrentPassword,
  logoutUser,
  refreshAccessToken,
};
