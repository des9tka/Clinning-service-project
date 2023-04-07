import {Link, Outlet} from "react-router-dom";

const AuthLayout = () => {

    return (
        <div className={'auth_links'}>
            <h1>Welcome to Cleaning Service!</h1>
            <div>
                <Link to={'login'}>Sign in</Link>
            </div>
            <br/>
            <div>
                <Link to={'register'}>Sign up</Link>
            </div>
            <Outlet/>
        </div>
    )
}
export {
    AuthLayout
};
