import {NavLink} from "react-router-dom";

import {Toggle} from "../Tools";

const UserHeader = () => {

    return (
        <div className={'header'}>
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink to={'/office?page=1&status=1'}>My cabinet</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            <NavLink to={'/auth/login'}>Exit</NavLink>
            <Toggle/>
        </div>
    )
}

export {
    UserHeader
};
