import {useEffect} from "react";

import {auth_service, history} from "../services";

const TokenValidCheck = () => {
    const token = localStorage.getItem('access')

    useEffect(() => {
        auth_service.token_check()
            .catch(function (error) {
                history.push('/auth/login')
            });
    }, [token])
}

export {
    TokenValidCheck
}
