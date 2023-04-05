import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {order_service} from "../../../services";

const checkoutFormOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
}

const PaymentForm = ({ success = () => {} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {id: url} = useParams();
  const [amount, setAmount] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    order_service.getById(url).then((response) => {
      setAmount((response.data.price) * 100)
    })
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const {id} = paymentMethod

      try {
        const {data} = await order_service.payment(id, amount, url)

        alert(data.status)
        success()
        navigate('/office')

      } catch ({message, response}) {
        console.log(response ? response.data : message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={checkoutFormOptions} />
      <button>Pay</button>
    </form>
  )
}

export {
    PaymentForm
};