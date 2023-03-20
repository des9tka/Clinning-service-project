import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {EmployeesBuilder} from "../EmployeesBuilder/EmployeesBuilder";
import {order_service, user_service} from "../../services";
import {userActions} from "../../redux";
import {OrderPhoto} from "../OrderPhoto/OrderPhoto";
import {LoadingPage} from "../Pages";

const EmployeeOrder = ({order}) => {

    const {user} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        user_service.getSelf().then(value => dispatch(userActions.setUser(value.data)))
    }, [])

    const take = () => {
        order_service.take(order.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }

    const done = () => {
        order_service.done(order.id).then((response) => {
            window.location.reload()
        }).catch((err) => console.log(err))
    }


if (!user) {
    return (
        <div>
            <LoadingPage/>
        </div>
    )
}

const taken = order.employees_current.includes(user.id)

return (
    <div>
        <div>Id: {order.id}</div>
        <div>Address: {order.address}</div>
        <div>Price: {order.price}</div>
        <div>Date: {order.date}</div>
        <div>Time: {order.time}</div>
        <div>Status: {order.status}</div>
        <div>Footage: {order.footage}</div>
        <div>Task: {order.task_description}</div>

        <div className={'order_wrap'}>
            {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
        </div>

        <div>Employees: {order.employees_current.length}/{order.employees_quantity}</div>
        {order.employees_current[0] && order.employees_current.map(employee_id => <EmployeesBuilder employee_id={employee_id}/>)}

        {!taken && <button onClick={() => take()}>Take</button>}
        {order.status === 5 && <button onClick={() => done()}>Done</button>}
        <hr/>
    </div>
)
}
export {
    EmployeeOrder
};
