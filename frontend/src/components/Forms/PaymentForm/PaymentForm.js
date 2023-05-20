import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {order_service} from "../../../services";
import {ErrorPage} from "../../Pages";
import {PaymentModal} from "../../Modals";

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

const PaymentForm = ({success = () => {}}) => {

    const stripe = useStripe();
    const elements = useElements();
    const {id: url, rate} = useParams();
    const [state, setState] = useState({
        amount: 0,
        check: false
    });

    useEffect(() => {
        order_service.getById(url).then((response) => {
            setState((prevState) =>
                ({...prevState, amount: (response.data.price) * 100})
            )
        })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })

        if (!error) {
            const {id} = paymentMethod

            try {
                await order_service.payment(id, state.amount, url, rate)

                success()
                setState((prevState) => ({...prevState, check: true}))

            } catch ({message, response}) {
                return <ErrorPage error={response ? response.data : message}/>
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"checkout-form"} style={{maxWidth: '500px'}}>
            {state.check && <PaymentModal/>}
            <CardElement options={checkoutFormOptions} style={{base: {fontSize: '16px'}}}/>
            <button>Pay</button>
        </form>
    )
}

export {
    PaymentForm
};