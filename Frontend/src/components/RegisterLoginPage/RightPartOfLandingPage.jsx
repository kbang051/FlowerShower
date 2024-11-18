// import React, { useState, useEffect, useRef } from 'react'
// import axios from "axios"

// const RightPartOfLandingPage = () => {
//     const [register, setRegister] = useState("Register")
//     const [showOTP, setShowOTP] = useState(false)
//     const firstname = useRef(null)
//     const lastname = useRef(null)
//     const username = useRef(null)
//     const email = useRef(null)
//     const password = useRef(null)
//     const otp = useRef(null)

//     const userRegistration = async (event) => {
//         event.preventDefault()
//         try {
//             console.log("Reached User Registration Function in frontend")
//             const response = await axios.post("http://localhost:8000/api/v1/users/register", {
//                 firstname: firstname.current.value,
//                 lastname: lastname.current.value,
//                 username: username.current.value,
//                 email: email.current.value,
//                 password: password.current.value
//             })
//             console.log("Response sent from the frontend: ", response)
//             if (response.status === 200) {
//                 const sendOtpResponse = await axios.post("http://localhost:8000/api/v1/users/sendOtp", { email: email.current.value })
//                 if (sendOtpResponse.status === 200) {
//                     setShowOTP(true)
//                 }
//             }
//         } catch (error) {
//             console.log("Error while registering the user:", error)
//         }
//     }

//     const otpVerification = async (event) => {
//         event.preventDefault()
//         try {
//             const otpVerificationResponse = await axios.post("http://localhost:8000/api/v1/users/registerAfterVerification", {
//                 firstname: firstname.current.value,
//                 lastname: lastname.current.value,
//                 username: username.current.value,
//                 email: email.current.value,
//                 password: password.current.value,
//                 otp: otp.current.value
//             })
//             if (otpVerificationResponse.status === 200) {
//                 console.log("User Registered Successfully")
//             } else {
//                 console.log("Got an error during OTP verification")
//             }
//         } catch (error) {
//             console.log("Error during OTP verification:", error)
//         }
//     }

//     const RegisterPage = () => (
//         <>
//             <div className="d-flex flex-column gap-3">
//                 <div className="form-floating">
//                     <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" ref={firstname} />
//                     <label htmlFor="floatingFirstName">First Name</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" ref={lastname} />
//                     <label htmlFor="floatingLastName">Last Name</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="text" className="form-control" id="floatingUsername" placeholder="Username" ref={username} />
//                     <label htmlFor="floatingUsername">Username</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="email" className="form-control" id="floatingEmail" placeholder="Email" ref={email} />
//                     <label htmlFor="floatingEmail">Email</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={password} />
//                     <label htmlFor="floatingPassword">Password</label>
//                 </div>
//             </div>
//             <p className="mt-5 mb-3 text-body-secondary" style={{ fontSize: "14px" }}>By Continuing, you agree to Terms of Use and Privacy Policy</p>
//             <button className="btn btn-primary w-100 py-2" type="submit" onClick={userRegistration}>Register</button>
//         </>
//     )

//     const SignInPage = () => (
//         <>
//             <div className="d-flex flex-column gap-3">
//                 <div className="form-floating">
//                     <input type="email" className="form-control" id="floatingSignInEmail" placeholder="Email or Username" />
//                     <label htmlFor="floatingSignInEmail">Email or Username</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="password" className="form-control" id="floatingSignInPassword" placeholder="Password" />
//                     <label htmlFor="floatingSignInPassword">Password</label>
//                 </div>
//             </div>
//             <p className="mt-5 mb-3 text-body-secondary" style={{ fontSize: "14px" }}>By Continuing, you agree to Terms of Use and Privacy Policy</p>
//             <button className="btn btn-primary w-100 py-2" type="submit" onClick={() => setShowOTP(true)}>Sign in</button>
//         </>
//     )

//     const OtpPopUp = () => {
//         const [timeLeft, setTimeLeft] = useState(30)
//         const [resendVisible, setResendVisible] = useState(false)

//         useEffect(() => {
//             if (timeLeft > 0) {
//                 const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//                 return () => clearTimeout(timerId)
//             } else {
//                 setResendVisible(true)
//             }
//         }, [timeLeft])

//         const handleResendOtp = () => {
//             setTimeLeft(30)
//             setResendVisible(false)
//             // Call the otp resend function if needed
//         }

//         return (
//             <div className="vh-100 vw-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(211, 211, 211, 0.5)", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
//                 <div className="d-flex flex-column p-4" style={{ height: "30%", width: "20%", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>
//                     <h5 className="text-center">Enter the OTP</h5>
//                     <input className="mt-3 p-2 form-control" type="number" placeholder="OTP" ref={otp} />
//                     <button className="btn btn-primary mt-4" onClick={otpVerification}>Verify</button>
//                     <button className="btn btn-secondary mt-2" onClick={() => setShowOTP(false)}>Close</button>
//                     {resendVisible ? (
//                         <button className="btn btn-link mt-3" onClick={handleResendOtp}>Resend OTP</button>
//                     ) : (
//                         <p className="mt-3 text-center text-secondary">Resend OTP in {timeLeft} seconds</p>
//                     )}
//                 </div>
//             </div>
//         )
//     }

//     return (

//         <div className="container m-2 rounded-5 d-flex flex-column" style={{ width: "45%" }}>
//             <form className="m-2 mt-4 px-5">
//                 <header className="d-flex justify-content-center py-3">
//                     <ul className="nav nav-pills" style={{ width: "100%" }}>
//                         <li className="nav-item w-50 text-center">
//                             <div onClick={() => setRegister("Register")} className={ `nav-link ${register === "Register" ? "active" : ""}` } style={{ cursor: "pointer" }}>Register</div>
//                         </li>
//                         <li className="nav-item w-50 text-center">
//                             <div onClick={() => setRegister("SignIn")} className={ `nav-link ${register === "SignIn" ? "active" : ""}` } style={{ cursor: "pointer" }}>Sign In</div>
//                         </li>
//                     </ul>
//                 </header>
//                 {register === "Register" ? <RegisterPage /> : <SignInPage />}
//                 {showOTP && <OtpPopUp />}
//             </form>
//         </div>
 
//     )
// }

// export default RightPartOfLandingPage

import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"

const RightPartOfLandingPage = () => {
    const [register, setRegister] = useState("Register")
    const [showOTP, setShowOTP] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })
    const firstname = useRef(null)
    const lastname = useRef(null)
    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const otp = useRef(null)

    const userRegistration = async (event) => {
        event.preventDefault()
        try {
            console.log("Reached User Registration Function in frontend")
            // Store the form data in state before making the API call
            const newFormData = {
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            setFormData(newFormData)

            const response = await axios.post("http://localhost:8000/api/v1/users/register", newFormData)
            console.log("Response sent from the frontend: ", response)
            if (response.status === 200) {
                const sendOtpResponse = await axios.post("http://localhost:8000/api/v1/users/sendOtp", { 
                    email: newFormData.email 
                })
                if (sendOtpResponse.status === 200) {
                    setShowOTP(true)
                }
            }
        } catch (error) {
            console.log("Error while registering the user:", error)
        }
    }

    const otpVerification = async (event) => {
        event.preventDefault()
        try {
            const otpVerificationResponse = await axios.post("http://localhost:8000/api/v1/users/registerAfterVerification", {
                ...formData,  // Spread the stored form data
                otp: otp.current.value
            })
            if (otpVerificationResponse.status === 200) {
                console.log("User Registered Successfully")
                setShowOTP(false)
                // Optionally redirect to login or show success message
            } else {
                console.log("Got an error during OTP verification")
            }
        } catch (error) {
            console.log("Error during OTP verification:", error)
        }
    }

    const RegisterPage = () => (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" ref={firstname} />
                    <label htmlFor="floatingFirstName">First Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" ref={lastname} />
                    <label htmlFor="floatingLastName">Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingUsername" placeholder="Username" ref={username} />
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="Email" ref={email} />
                    <label htmlFor="floatingEmail">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            </div>
            <p className="mt-5 mb-3 text-body-secondary" style={{ fontSize: "14px" }}>By Continuing, you agree to Terms of Use and Privacy Policy</p>
            <button className="btn btn-primary w-100 py-2" type="submit" onClick={userRegistration}>Register</button>
        </>
    )

    // Rest of your component remains the same...
    const SignInPage = () => (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingSignInEmail" placeholder="Email or Username" />
                    <label htmlFor="floatingSignInEmail">Email or Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingSignInPassword" placeholder="Password" />
                    <label htmlFor="floatingSignInPassword">Password</label>
                </div>
            </div>
            <p className="mt-5 mb-3 text-body-secondary" style={{ fontSize: "14px" }}>By Continuing, you agree to Terms of Use and Privacy Policy</p>
            <button className="btn btn-primary w-100 py-2" type="submit" onClick={() => setShowOTP(true)}>Sign in</button>
        </>
    )

    const OtpPopUp = () => {
        const [timeLeft, setTimeLeft] = useState(30)
        const [resendVisible, setResendVisible] = useState(false)

        useEffect(() => {
            if (timeLeft > 0) {
                const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
                return () => clearTimeout(timerId)
            } else {
                setResendVisible(true)
            }
        }, [timeLeft])

        const handleResendOtp = async () => {
            setTimeLeft(30)
            setResendVisible(false)
            try {
                await axios.post("http://localhost:8000/api/v1/users/sendOtp", { 
                    email: formData.email 
                })
            } catch (error) {
                console.log("Error resending OTP:", error)
            }
        }

        return (
            <div className="vh-100 vw-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(211, 211, 211, 0.5)", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
                <div className="d-flex flex-column p-4" style={{ height: "30%", width: "20%", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>
                    <h5 className="text-center">Enter the OTP</h5>
                    <input className="mt-3 p-2 form-control" type="number" placeholder="OTP" ref={otp} />
                    <button className="btn btn-primary mt-4" onClick={otpVerification}>Verify</button>
                    <button className="btn btn-secondary mt-2" onClick={() => setShowOTP(false)}>Close</button>
                    {resendVisible ? (
                        <button className="btn btn-link mt-3" onClick={handleResendOtp}>Resend OTP</button>
                    ) : (
                        <p className="mt-3 text-center text-secondary">Resend OTP in {timeLeft} seconds</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="container m-2 rounded-5 d-flex flex-column" style={{ width: "45%" }}>
            <form className="m-2 mt-4 px-5">
                <header className="d-flex justify-content-center py-3">
                    <ul className="nav nav-pills" style={{ width: "100%" }}>
                        <li className="nav-item w-50 text-center">
                            <div onClick={() => setRegister("Register")} className={`nav-link ${register === "Register" ? "active" : ""}`} style={{ cursor: "pointer" }}>Register</div>
                        </li>
                        <li className="nav-item w-50 text-center">
                            <div onClick={() => setRegister("SignIn")} className={`nav-link ${register === "SignIn" ? "active" : ""}`} style={{ cursor: "pointer" }}>Sign In</div>
                        </li>
                    </ul>
                </header>
                {register === "Register" ? <RegisterPage /> : <SignInPage />}
                {showOTP && <OtpPopUp />}
            </form>
        </div>
    )
}

export default RightPartOfLandingPage



