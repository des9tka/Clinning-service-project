import {LoginForm} from "../../Forms";
import {Link} from "react-router-dom";

import {auth_service} from "../../../services";

const LoginPage = () => {

    auth_service.deleteTokens()

    return (
        <div>
            LoginPage
            <LoginForm/>
            <Link to={'/auth/register'}>I`m new user</Link><br/>
            <Link to={'/auth/request_password_recovery'}>Forgot password</Link>
        </div>
    )
}
export {LoginPage};
