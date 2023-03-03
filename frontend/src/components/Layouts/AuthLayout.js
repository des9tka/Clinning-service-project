import {Link, Outlet} from "react-router-dom";

const AuthLayout = () => {

    return (
        <div>
            <Link to={'login'}>login</Link>
            <Link to={'register'}>register</Link>
            <Outlet/>

        </div>
    )
}
export {AuthLayout};
