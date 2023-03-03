import {LoginForm} from "../Forms/LoginForm/LoginForm";
import {Link} from "react-router-dom";

const LoginPage = () => {

    return (
        <div>
            LoginPage
            <LoginForm/>
            <Link to={'/auth/register'}>I`m new user</Link>
            <Link to={'/auth/restore_password'}>Forgot password</Link>
        </div>
    )
}
export {LoginPage};
