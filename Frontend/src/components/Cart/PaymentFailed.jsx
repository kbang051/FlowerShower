import React from "react"
import { Button, Card, Result } from "antd"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const FailurePage = () => {
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow p-4 text-center" style={{ maxWidth: "500px" }}>
        <Result
          status="error"
          title="Payment Failed"
          subTitle="Unfortunately, your payment could not be processed. Please try again."
        />
        <Button type="primary" danger className="w-100 mb-2" size="large" onClick={() => navigate("/mainLandingPage/cart")}>
          Retry Payment
        </Button>
        <Button type="default" className="w-100" size="large" onClick={() => navigate("/mainLandingPage")}>
          Back to Home
        </Button>
      </Card>
    </div>
  )
}

export default FailurePage