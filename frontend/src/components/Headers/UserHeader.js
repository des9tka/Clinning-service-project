import {NavLink} from "react-router-dom";

const UserHeader = () => {

    return (
        <div className={'header'}>
            <div>
                <NavLink to={'/home'}>Home</NavLink>
            </div>
            <div>
                <NavLink to={'/office'}>My cabinet</NavLink>
            </div>
            <div>
                <NavLink to={'/about'}>About</NavLink>
            </div>
            <div>
                <NavLink to={'/help'}>Help</NavLink>
            </div>
            <div>
                <NavLink to={'/auth'}>Exit</NavLink>
            </div>
        </div>
    )
}
export {UserHeader};
