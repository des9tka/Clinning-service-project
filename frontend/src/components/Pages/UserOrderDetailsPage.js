import {useSelector} from "react-redux";

import {UserOrderButtons} from "../Order/UserOrderButtons";
import {OrderPhoto} from "../OrderPhoto/OrderPhoto";
import {EmployeesBuilder} from "../EmployeesBuilder/EmployeesBuilder";

const UserOrderDetailsPage = () => {

    const {order} = useSelector(state => state.orderReducer)

    return (
        <div>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>
            <div>Service: {order.service}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>

            {order.status !== 1 && <div>Price: {order.price}</div>}
            {order.status !== 1 && <div>Employees need: {order.employees_quantity}</div>}
            {order.status !== 1 && <div>Employees now: </div>}
            {order.status !== 1 && order.employees_current[0] && order.employees_current.map(id => <EmployeesBuilder id={id}/>)}

            <div className={'order_wrap'}>
                 {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>

            <hr/>

            <UserOrderButtons id={order.id} status={order.status}/>
        </div>
    )
}
export {
    UserOrderDetailsPage
};
