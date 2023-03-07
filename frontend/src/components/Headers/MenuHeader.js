import {NavLink} from "react-router-dom";

const MenuHeader = () => {

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
                <NavLink to={'/auth/login'}>Exit</NavLink>
            </div>
        </div>
    )
}
export {MenuHeader};
