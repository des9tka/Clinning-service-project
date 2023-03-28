import {LoginForm} from "../../Forms";
import {Link} from "react-router-dom";

import {authService} from "../../../services";

const LoginPage = () => {

    authService.deleteTokens()

    return (
        <div>
            LoginPage
            <LoginForm/>
            <Link to={'/auth/register'}>I`m new user</Link><br/>
            <Link to={'/auth/restore_password'}>Forgot password</Link>
        </div>
    )
}
export {LoginPage};
