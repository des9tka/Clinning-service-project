import {NavLink} from "react-router-dom";

const WorkerHeader = () => {

    return (
        <div className={'header'}>
            <NavLink to={'/employee/home'}>Home</NavLink>
            <NavLink to={'/employee/orders'}>Orders</NavLink>
            <NavLink to={'/employee/office'}>Office</NavLink>
            <NavLink to={'/employee/about'}>About</NavLink>
            <NavLink to={'/auth/login'}>Exit</NavLink>
        </div>
    )
}
export {
    WorkerHeader
};
