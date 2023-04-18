import {Outlet, useNavigate} from "react-router-dom";

const AuthLayout = () => {

    const navigate = useNavigate();


    return (
        <div className={'auth-layout-div'}>
            <h1 className={'auth-greeting'}>Welcome to Our <br/>Cleaning Service!</h1>
            <div className={'auth-buttons-div'}>
                <button className={'auth-buttons'} onClick={() => navigate('login')}>Log in</button>
                <button className={'auth-buttons'} onClick={() => navigate('register')}>Sign up</button>
            </div>
            <Outlet/>
        </div>
    )
}

export {
    AuthLayout
};
