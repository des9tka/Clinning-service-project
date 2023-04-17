import {NavLink} from "react-router-dom";

const SuperUserHeader = () => {

    return (
        <div className={'header'}>
            <NavLink to={'/superuser/home'}>Home</NavLink>
            <NavLink to={'/superuser/services'}>Services</NavLink>
            <NavLink to={'/superuser/users'}>Users</NavLink>
            <NavLink to={'/superuser/orders'}>Orders</NavLink>
            <NavLink to={'/superuser/about'}>About</NavLink>
            <NavLink to={'/auth'}>Exit</NavLink>
        </div>
    )
}

export {
    SuperUserHeader
};