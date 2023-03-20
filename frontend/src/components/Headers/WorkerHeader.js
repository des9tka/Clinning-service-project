import {NavLink} from "react-router-dom";

const WorkerHeader = () => {

    return (
        <div className={'header'}>
            <div>
                <NavLink to={'/employee/home'}>Home</NavLink>
            </div>
            <div>
                <NavLink to={'/employee/orders'}>Orders</NavLink>
            </div>
            <div>
                <NavLink to={'/employee/office'}>Office</NavLink>
            </div>
            <div>
                <NavLink to={'/employee/about'}>About</NavLink>
            </div>
            <div>
                <NavLink to={'/auth'}>Exit</NavLink>
            </div>
        </div>
    )
}
export {
    WorkerHeader
};
