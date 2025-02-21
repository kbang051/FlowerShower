import React, { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'

const MakePayment = async () => {
  const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!STRIPE_KEY)
    console.error("Stripe failed to initialize")
  try {
    const stripe = await loadStripe(STRIPE_KEY)
    const response = await axios.post('http://localhost:8000/api/v1/payment/stripePaymentGateway', {}, { withCredentials: true })
    const session = await response.data 
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error)
      console.log(result.error)
  } catch (error) {
    console.error(`Error initiating payment: ${error}`)
  }
}

export default MakePayment
