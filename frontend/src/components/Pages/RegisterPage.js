import {Link} from "react-router-dom";

import {RegisterForm} from "../Forms/RegisterForm/RegisterForm";

const RegisterPage = () => {

    return (
        <div>
            RegisterPage
            <RegisterForm/>
            <Link to={'/auth/login'}>I`m signed up</Link>
            <Link to={'/auth/restore_password'}>Forgot password</Link>
        </div>
    )
}
export {
    RegisterPage
};
