import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {user_service} from "../../../services";
import {LoadingPage} from "./LoadingPage";

const ActivateUserPage = () => {

    const {token} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        user_service.activateByToken(token)
            .then(() => setIsActivated(true))
            .catch((error) => {
                console.error(error);
                setIsActivated(false);
            })
            .finally(() => setIsLoading(false));
    }, [token]);

    if (isLoading) {
        return <LoadingPage/>;
    }

    if (isActivated) {
        return (
            <div>
                <h1>Your Account was Successfully activated.</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Activation Failed.</h1>
        </div>
    );
};

export {
    ActivateUserPage
};
