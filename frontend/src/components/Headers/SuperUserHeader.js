import {NavLink} from "react-router-dom";

const SuperUserHeader = () => {

    return (
        <div className={'header'}>
            <div>
                <NavLink to={'/superuser/home'}>Home</NavLink>
            </div>
            <div>
                <NavLink to={'/superuser/services'}>Services</NavLink>
            </div>
            <div>
                <NavLink to={'/superuser/users'}>Users</NavLink>
            </div>
            <div>
                <NavLink to={'/superuser/orders'}>Orders</NavLink>
            </div>
            <div>
                <NavLink to={'/superuser/about'}>About</NavLink>
            </div>
            <div>
                <NavLink to={'/auth'}>Exit</NavLink>
            </div>
        </div>
    )
}
export {
    SuperUserHeader
};