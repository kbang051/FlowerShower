import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import '../RegisterLoginPage CSS/NewRegisterLoginPage.css'

const NewLoginRegisterPage = () => {
    const [activeTab, setActiveTab] = useState('register');
    const { register, handleSubmit } = useForm()
    const [ registerFormData, setRegisterFormData ] = useState("")
    const [showOTP, setShowOTP] = useState(false)

    const navigate = useNavigate()

    const login = async (formData) => {
      try {
          const response = await axios.post('http://localhost:8000/api/v1/users/login', formData, { withCredentials: true }) 
          if (response.status == 200) {
              localStorage.setItem('Email', formData.email)
              navigate('/mainLandingPage')
          }
      } catch (error) {
        console.log("An error occured while trying to login:")
        console.log(error)
      }
  }

  const registerUser = async (userInput) => {
    try {
      setRegisterFormData(userInput);
      const register = await axios.post("http://localhost:8000/api/v1/users/register", userInput)
      if (register.status === 200) {
        await sendOtp(userInput)
        setShowOTP(true)
      } else {
        console.log("Some problem in input, please check your data")
      }
    } catch (error) {
      console.log("Unable to proceed to otp verification")
      console.log(error)
    }
  }

  const sendOtp = async (userInput) => { //requires only email
    try {
      const sendOtp = await axios.post('http://localhost:8000/api/v1/users/sendOtp', { email: userInput.email })
      if (sendOtp.status != 200) {
        console.log("Unable to send otp at the second stage")
      } else {
        console.log("OTP sent successfully")
      }
    } catch (error) {
      console.log("Failed in sendOTP step: ", error)
    }
  }

  const otpVerification = async (otp) => {
    console.log("OTP received at otpVerification")
    console.log(otp)
    const otpVerification = await axios.post('http://localhost:8000/api/v1/users/registerAfterVerification', { ...otp })
    if (otpVerification.status == 200) {
      setShowOTP(false)
      setActiveTab('login')
    }
    else {
      console.log("Failed to clear otp verification, wrong OTP entered: ", error)
    } 
  }

  const OTPInput = () => {
    const [timeLimit, setTimeLimit] = useState(45)
    const [showResendOTP, setShowResendOTP] = useState(false)
    
    useEffect(() => {
      if (timeLimit > 0) {
          const timer = setTimeout(() => setTimeLimit(timeLimit - 1), 1000)
          return () => clearTimeout(timer)
      } else {
          setShowResendOTP(true)
      }
    }, [timeLimit]);

    const handleResendOTP = async () => {
      await sendOtp(registerFormData)
      setTimeLimit(45)
      setShowResendOTP(false)
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-50 position-fixed w-100 top-0 start-0">
        <div className="bg-white p-4 rounded shadow-lg text-center w-25">
          <form className="space-y-4" onSubmit={handleSubmit(otpVerification)}>
            <h2 className="mb-3">Please enter OTP</h2>
            <input
              {...register("otp", { required: true })}
              type="text"
              className="form-control text-center mb-3"
              placeholder="Enter OTP"
            />
            <div className='d-flex flex-column'>
              <div className='d-flex'>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </div>
              {showResendOTP ? (
                <button className="btn btn-link" onClick={handleResendOTP}>Resend OTP</button>
              ) : (
                <p>Resend OTP in: {timeLimit} seconds</p>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }

    return (
      <div className="min-vh-100 d-flex flex-column dark-gradient-background">
        {/* Hero Section */}
        <div className="flex-grow-1 d-flex justify-content-between align-items-center px-5 py-5 mx-auto" style={{maxWidth: '1140px'}}>
          {/* Left Content */} 

          <div className="w-50 pr-4">
            <h1 className="display-4 text-white mb-4">Welcome to FlowerShower</h1>
            <p className="lead text-white mb-5">Discover the latest trends in fashion and shop your favorite styles. Join our community of fashion enthusiasts today.</p>
            <div className="d-flex gap-4">
              <a href="#features" className="btn btn-dark-theme btn-lg rounded-pill px-4 py-2">Learn More</a>
              <a href="#shop" className="btn btn-outline-light btn-lg rounded-pill px-4 py-2">Browse Collection</a>
            </div>
          </div>
  
          {/* Auth Card */}
          <div className="card-dark w-50">
            {/* Auth Tabs */}
            <div className="d-flex">
              <button 
                onClick={() => setActiveTab('register')}
                className={`flex-grow-1 py-4 text-lg font-weight-bold text-center transition-colors
                  ${activeTab === 'register' 
                    ? 'bg-purple-600' 
                    : 'bg-light text-dark hover-bg-light'}`}
              >
                Register
              </button>
              <button 
                onClick={() => setActiveTab('login')}
                className={`flex-grow-1 py-4 text-lg font-weight-bold text-center transition-colors
                  ${activeTab === 'login' 
                    ? 'bg-purple-600' 
                    : 'bg-light text-dark hover-bg-light'}`}
              >
                Login
              </button>
            </div>

            {/* Auth Forms */}
            <div className="p-4">
              {activeTab === 'register' ? (
                <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
                  <div className="d-flex gap-4">
                    <div className="flex-grow-1">
                      <label className="form-label text-white">First Name</label>
                      <input {...register("firstname", { required: true })} type = "text" placeholder="First name" className="form-control form-control-dark"/>
                    </div>
                    <div className="flex-grow-1">
                      <label className="form-label text-white">Last Name</label>
                      <input {...register("lastname", { required: true })} type = "text" placeholder="Last name" className="form-control form-control-dark"/>
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-white">Username</label>
                    <input {...register("username", { required: true })} type = "text" placeholder="User name" className="form-control form-control-dark"/>
                  </div>
                  <div>
                    <label className="form-label text-white">Email</label>
                    <input {...register("email", { required: true })} type = "email" placeholder="Email" className="form-control form-control-dark"/>
                  </div>
                  <div>
                    <label className="form-label text-white">Password</label>
                    <input {...register("password", { required: true })} type= "password" placeholder="Password" className="form-control form-control-dark"/>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark-theme w-100 py-2 mt-3"
                    style = {{border: "1px solid white", color: "white"}}
                  >
                    Register
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit(login)}>
                  <div>
                    <label className="form-label text-white">Email</label>
                    <input {...register("email", { required: true })} type = "email" placeholder="Email" className="form-control form-control-dark"/>
                  </div>
                  <div>
                    <label className="form-label text-white">Password</label>
                    <input {...register("password", { required: true })} type= "password" placeholder="Password" className="form-control form-control-dark"/>
                  </div>
                  <div className="d-flex justify-content-between">
                    <label className="form-check-label text-white">
                      <input type="checkbox" className="form-check-input" />
                      <span className='px-2'>Remember me</span>
                    </label>
                    <a href="#forgot" className="text-sm text-purple-600 hover:text-purple-500">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark-theme w-100 py-2 mt-3"
                    style = {{border: "1px solid white", color: "white"}}
                  >
                    Sign In
                  </button>
                </form>
              )}
            </div>
            {showOTP && <OTPInput />}
          </div>
        </div>
  
        {/* Features Section */}
        <div className="bg-dark py-5" id="features">
          <div className="container">
            <h2 className="text-center text-white mb-5">Why Choose Us?</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {[{
                title: 'Curated Collections',
                description: 'Hand-picked selections from top designers and brands.'
              }, {
                title: 'Fast Shipping',
                description: 'Quick delivery to your doorstep with real-time tracking.'
              }, {
                title: 'Secure Shopping',
                description: 'Safe and secure payment processing for peace of mind.'
              }].map((feature, index) => (
                <div key={index} className="col">
                  <div className="card text-center p-3 rounded-3 shadow-sm card-dark">
                    <h3 className="h5">{feature.title}</h3>
                    <p className="text-white">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewLoginRegisterPage;