import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const incomingToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!incomingToken) 
      throw new ApiError(400, "Unauthorized request")
    const decodedToken = jwt.verify( incomingToken, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    if (!user) 
      throw new ApiError(400, "Invalid User")
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid Access Token")
  }
});

export default verifyJWT
