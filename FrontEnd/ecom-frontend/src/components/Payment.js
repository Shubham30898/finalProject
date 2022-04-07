import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Payment() {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [orderId, setOrderId] = useState(false)

  // var amount = JSON.parse(localStorage.getItem('total'))
  // console.log(amount)

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'This is the Book Worth 100$',
            amount: {
              currency_code: 'USD',
              value: JSON.parse(sessionStorage.getItem('total')),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderId(orderID)
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details

      setSuccess(true)
      const token = sessionStorage.getItem('token')
      axios
        .post(`http://localhost:8080/payment/add?token=${token}`, {
          status: JSON.parse(sessionStorage.getItem('status')),
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const onError = (data, actions) => {
    setErrorMessage('An error occured with your payment')
  }

  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          'client-id':
            'AQ41R_Q4w53ojAQX_YcFuhdus1yuU2JQSBOolJgHMaMkF06pb82_o5V_9bUsb8lpblNvZ8MHRnhs87OQ',
        }}
      >
        <h1>Total Amount</h1>

        <span>{JSON.parse(sessionStorage.getItem('total'))}</span>
        <br></br>
        <button onClick={() => setShow(true)} type="submit">
          Buy Now
        </button>

        {show ? (
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        ) : null}

        {success ? (
          <div>
            {sessionStorage.setItem('status', 'true')}
            <h1>Your Payment has been done successfully please check email</h1>
          </div>
        ) : (
          <h2>payment is pending</h2>
        )}
      </PayPalScriptProvider>
    </div>
  )
}

export default Payment
