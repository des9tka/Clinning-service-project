import {Link} from "react-router-dom";

import {RegisterForm} from "../../Forms";

const RegisterPage = () => {

    return (
        <div>
            <h1 className={'about-text'}>SIGN UP</h1>
            <RegisterForm/>
            <div className={'swapLinks-div'}>
                <Link to={'/auth/login'}>I`m signed up</Link><br/>
                <Link to={'/auth/request_password_recovery'}>Forgot password</Link>
            </div>
        </div>
    )
}

export {
    RegisterPage
};
