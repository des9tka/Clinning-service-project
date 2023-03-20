import {NavLink} from "react-router-dom";

const AdminHeader = () => {

    return (
        <div className={'header'}>
            <div>
                <NavLink to={'home'}>Home</NavLink>
            </div>
            <div>
                <NavLink to={'users'}>Users</NavLink>
            </div>
            <div>
                <NavLink to={'orders'}>Orders</NavLink>
            </div>
            <div>
                <NavLink to={'office'}>Office</NavLink>
            </div>
            <div>
                <NavLink to={'about'}>About</NavLink>
            </div>
            <div>
                <NavLink to={'/auth'}>Exit</NavLink>
            </div>
        </div>
    )
}
export {
    AdminHeader
};
