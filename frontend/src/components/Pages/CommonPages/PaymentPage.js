import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {auth_service} from "../../../services";

import {PaymentForm} from "../../Forms";
import {LoadingPage} from "./LoadingPage";

const PaymentPage = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        auth_service.stripe_token().then((response) => setToken(response.data))
    }, [])

    const stripePromise = loadStripe(`${token}`)

    if (!token) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm/>
            </Elements>
        </div>

    )
}

export {
    PaymentPage
};
