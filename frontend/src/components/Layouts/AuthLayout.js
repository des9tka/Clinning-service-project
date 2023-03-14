import {Link, Outlet} from "react-router-dom";

const AuthLayout = () => {

    return (
        <div className={'auth_links'}>
            <Link to={'login'}>login</Link><br/>
            <Link to={'register'}>register</Link>
            <Outlet/>
        </div>
    )
}
export {
    AuthLayout
};
