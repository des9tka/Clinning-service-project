import {OrderPhoto} from "../OrderPhoto/OrderPhoto";
import {EmployeesBuilder} from "../EmployeesBuilder/EmployeesBuilder";
import {order_service} from "../../services";

const EmployeeOrder = ({order}) => {

    const take = () => {
        order_service.take(order.id).then(() => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Price: {order.price}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>

             <div className={'order_wrap'}>
                 {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>

            <div>Employees: {order.employees_current.length}/{order.employees_quantity}</div>
            {order.employees_current[0] && order.employees_current.map(id => <EmployeesBuilder employee_id={id}/>)}

            <button onClick={() => take()}>Take</button>
        </div>
    )
}
export {
    EmployeeOrder
};
