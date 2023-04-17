import {NavLink} from "react-router-dom";

const UserHeader = () => {

    return (
        <div className={'header'}>
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink to={'/office'}>My cabinet</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            <NavLink to={'/help'}>Help</NavLink>
            <NavLink to={'/auth'}>Exit</NavLink>
        </div>
    )
}
export {UserHeader};
