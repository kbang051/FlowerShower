import React from "react"
import { Button, Card, Result } from "antd"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow p-4 text-center" style={{ maxWidth: "500px" }}>
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Thank you for your purchase. Your order has been placed successfully."
        />
        <Button type="primary" size="large" className="w-100 mt-3" onClick={() => navigate("/mainLandingPage")}>
          Back to Home
        </Button>
      </Card>
    </div>
  )
}

export default SuccessPage
