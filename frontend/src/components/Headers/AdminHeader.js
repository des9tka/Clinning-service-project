import {NavLink} from "react-router-dom";

import {Toggle} from "../Tools";

const AdminHeader = () => {

    return (
        <div className={'header'}>
            <NavLink to={'home'}>Home</NavLink>
            <NavLink to={'users'}>Users</NavLink>
            <NavLink to={'orders'}>Orders</NavLink>
            <NavLink to={'office'}>Office</NavLink>
            <NavLink to={'about'}>About</NavLink>
            <NavLink to={'/auth/login'}>Exit</NavLink>
            <Toggle/>
        </div>
    )
}

export {
    AdminHeader
};
