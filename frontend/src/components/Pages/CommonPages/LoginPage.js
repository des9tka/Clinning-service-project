import {LoginForm} from "../../Forms";
import {Link} from "react-router-dom";

import {auth_service} from "../../../services";

const LoginPage = () => {

    auth_service.deleteTokens()

    return (
        <div className={'login-page-div'}>
            <h1>SIGN IN</h1>
            <LoginForm/>
            <div className={'swapLinks-div'}>
                <Link to={'/auth/register'}>I`m new user</Link><br/>
                <Link to={'/auth/request_password_recovery'}>Forgot password</Link>
            </div>
        </div>
    )
}

export {
    LoginPage
};
