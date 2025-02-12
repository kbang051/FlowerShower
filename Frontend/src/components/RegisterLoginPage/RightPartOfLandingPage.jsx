import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../RegisterLoginPage CSS/toast.css'

const Toast = ({message, type, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast ${type} show`}>
            {message}
        </div>
    )
}

const RightPartOfLandingPage = () => {
    const [register, setRegister] = useState("register")
    const [signIn, setSignIn] = useState("signIn")
    const [showOTP, setShowOTP] = useState(false)
    const [toast, setToast] = useState({ show: false, message: "", type: "" })
    const [otpSent, setOtpSent] = useState(false) // To track if OTP was sent
    const [registerFormData, setRegisterFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: ''
    })
    const firstname = useRef('')
    const lastname = useRef('')
    const username = useRef('')
    const email = useRef('')
    const password = useRef('')
    const otp = useRef('')
    const emailOrUsername = useRef('')
    const navigate = useNavigate()

    const login = async (event) => {
        event.preventDefault()
        const userInput = {
            username: emailOrUsername.current.value,
            password: password.current.value
        }
        setLoginFormData(userInput)
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', loginFormData, { withCredentials: true })
            if (response.status == 200) {
                localStorage.setItem('UserName', loginFormData.username)
                setToast({ show: true, message: "Login Successful !!", type: "success" })
                navigate('/mainLandingPage')
            }
        } catch (error) {
            setToast({ show: true, message: error.message || "An error occurred", type: "error" })
        }
    }

    const registerUser = async (event) => {
        event.preventDefault()
        const userInput = {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        }
        setRegisterFormData(userInput)
        try {
            await axios.post('http://localhost:8000/api/v1/users/register', userInput)
            await axios.post('http://localhost:8000/api/v1/users/sendOtp', { email: userInput.email } )
            console.log(registerFormData)
            setShowOTP(true) 
            setOtpSent(true) // OTP sent successfully
        } catch (error) {
            setToast({ show: true, message: error.message || "An error occurred", type: "error" })
        }
    }

    const otpVerification = async (event) => {
        event.preventDefault()
        const userInput = {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        }
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/registerAfterVerification', { ...registerFormData, otp: otp.current.value })
            if (response.status == 200) {
                setToast({ show: true, message: "OTP verified successfully!", type: "success" })
                setShowOTP(false)
                setRegister("SignIn")
            }
        } catch (error) {
            setToast({ show: true, message: error.message || "An error occurred", type: "error" })
        }
    }

    const resendOtp = async (event) => {
        try {
          await axios.post('http://localhost:8000/api/v1/users/sendOtp', { email: registerFormData.email })
          setToast({ show: true, message: "OTP resent successfully!", type: "success" })
          setOtpSent(true) // OTP resent
        } catch (error) {
          setToast({ show: true, message: "Failed to resend OTP", type: "error" })
        }
    }

    const OtpUI = () => {
        const [resendOTP, setResendOTP] = useState(false)
        const [countDown, setCountDown] = useState(30)
        useEffect(()=> {
            if (countDown > 0) {
                const timer = setTimeout(() => setCountDown(countDown-1), 1000)
                return () => clearTimeout(timer)
            } else {
                setResendOTP(true)
            }
        }, [countDown])

        const OtpInterface = () => {
            if (countDown != 0) {
                return (
                    <div className='d-flex justify-content-center gap-2'>
                        <span className='text-dark'>Resend OTP in</span>
                        <span className="text-center mb-3 text-primary"> {countDown} </span>
                    </div>
                )
            } else {
                return (
                    <div className='d-flex justify-content-center gap-2'>
                        <button className= "btn btn-primary text-center mb-3" onClick={() => resendOtp()}> Resend OTP </button>
                    </div>
                )
            }
        }

        return (
            <div
            className="d-flex justify-content-center align-items-center"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)", 
                zIndex: 1000,
            }}
            >
            <div className="bg-light p-4 rounded" style={{ width: "300px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
                <h5 className="text-center mb-3 text-dark">OTP Verification</h5>
                <p className="text-start text-dark">Please Enter OTP</p>
                <input type="text" className="form-control mb-3" placeholder="OTP" ref= {otp}/>
                {OtpInterface()}
                <div className='d-flex gap-2'>
                    <button className="btn btn-primary w-100" type= "submit" onClick={otpVerification}>Submit</button>
                    <button className="btn btn-primary w-100" type= "submit" onClick={() => setShowOTP(false)}>Cancel</button>
                </div>
            </div>
            </div>
        );
    };

    const RegisterUI = () => {
        return (
            <>
                <div className='d-flex flex-column gap-3 p-5' style= {{backgroundColor: "#23272F"}}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {firstname} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {lastname} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {username} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {email} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {password} />
                    </div>
                    <button className='btn w-100 fw-medium bg-warning' type= "submit" onClick={registerUser}> Continue </button>
                </div>
            </>
        )
    }

    const SignInUI = () => {
        return (
            <>
                <div className='d-flex flex-column gap-3 p-5' style= {{backgroundColor: "#23272F"}}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Email or Username</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {emailOrUsername}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref = {password}/>
                    </div>
                    <button className='btn w-100 fw-medium bg-warning' type= "submit" onClick={login}> Continue </button>
                </div>
            </>
        )
    }

    
    return (
        <div className='container m-2 d-flex flex-column text-light' style={{border: "1px solid black", width: "450px", backgroundColor: "#23272F"}}>
                <div className='d-flex justify-content-center m-3 gap-2'> 
                    <button className='btn fw-semibold fs-5 w-50 btn-light' type="submit" style = {{border: "1px solid black"}} onClick={() => setRegister("register")}> Register </button>
                    <button className='btn fw-semibold fs-5 w-50 btn-light' type="submit" style = {{border: "1px solid black"}} onClick={() => setRegister("signIn")}> Login    </button>
                </div>
                {register === "register" ? <RegisterUI /> : <SignInUI/>}
                {showOTP && <OtpUI />}
                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ show: false, message: "", type: "" })}
                    />
                )}
        </div>
  )
}

export default RightPartOfLandingPage





















// import React, { useState, useEffect, useRef } from 'react'
// import axios from "axios"

// const RightPartOfLandingPage = () => {
//     const [register, setRegister] = useState("Register")
//     const [showOTP, setShowOTP] = useState(false)
//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         username: '',
//         email: '',
//         password: ''
//     })
//     const firstname = useRef(null)
//     const lastname = useRef(null)
//     const username = useRef(null)
//     const email = useRef(null)
//     const password = useRef(null)
//     const otp = useRef(null)

//     const userRegistration = async (event) => {
//         event.preventDefault()
//         try {
//             const newFormData = {
//                 firstname: firstname.current.value,
//                 lastname: lastname.current.value,
//                 username: username.current.value,
//                 email: email.current.value,
//                 password: password.current.value
//             }
//             setFormData(newFormData)

//             const response = await axios.post("http://localhost:8000/api/v1/users/register", newFormData)
//             if (response.status === 200) {
//                 const sendOtpResponse = await axios.post("http://localhost:8000/api/v1/users/sendOtp", { email: newFormData.email })
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
//             const otpVerificationResponse = await axios.post("http://localhost:8000/api/v1/users/registerAfterVerification", { ...formData, otp: otp.current.value })
//             if (otpVerificationResponse.status === 200) {
//                 console.log("User Registered Successfully")
//                 setShowOTP(false)
//                 // Optionally redirect to login or show success message
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

//     // Rest of your component remains the same...
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

//         const handleResendOtp = async () => {
//             setTimeLeft(30)
//             setResendVisible(false)
//             try {
//                 await axios.post("http://localhost:8000/api/v1/users/sendOtp", { email: formData.email })
//             } catch (error) {
//                 console.log("Error resending OTP:", error)
//             }
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
//                             <div onClick={() => setRegister("Register")} className={`nav-link ${register === "Register" ? "active" : ""}`} style={{ cursor: "pointer" }}>Register</div>
//                         </li>
//                         <li className="nav-item w-50 text-center">
//                             <div onClick={() => setRegister("SignIn")} className={`nav-link ${register === "SignIn" ? "active" : ""}`} style={{ cursor: "pointer" }}>Sign In</div>
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



