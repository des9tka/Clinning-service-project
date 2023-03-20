import {useEffect} from "react";

import {authService, history} from "../services";

const TokenValidCheck = () => {
    const token = localStorage.getItem('access')

    useEffect(() => {
        authService.token_check()
            .catch(function (error) {
                history.push('/auth/login')
            });
    }, [token])
}

export {
    TokenValidCheck
}
