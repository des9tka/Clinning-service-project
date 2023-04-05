import {Link} from "react-router-dom";

import {RegisterForm} from "../../Forms";

const RegisterPage = () => {

    return (
        <div>
            RegisterPage
            <RegisterForm/>
            <Link to={'/auth/login'}>I`m signed up</Link><br/>
            <Link to={'/auth/request_password_recovery'}>Forgot password</Link>
        </div>
    )
}
export {
    RegisterPage
};
