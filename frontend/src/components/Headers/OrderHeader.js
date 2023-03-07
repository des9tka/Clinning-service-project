import {NavLink} from "react-router-dom";

const OrderHeader = () => {

    return (
        <div>
            <NavLink to={'add_order'}/>
            <NavLink to={'unapproved_orders'}/>
            <NavLink to={''}/>
            <NavLink to={''}/>
            <NavLink to={''}/>
        </div>
    )
}
export {
    OrderHeader
};
