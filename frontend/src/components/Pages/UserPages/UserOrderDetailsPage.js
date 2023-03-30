import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {UserOrderButtons} from "../../Order";
import {OrderPhoto} from "../../OrderPhoto";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {orderActions} from "../../../redux";
import {LoadingPage, ErrorPage} from "../CommonPages";

const UserOrderDetailsPage = () => {

    const {order, loading, error} = useSelector(state => state.orderReducer)
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
    }, [])

    if (!order) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage/>}

            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>
            <div>Service: {order.service}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>

            {order.status !== 1 && <div>Price: {order.price}</div>}
            {order.status !== 1 && <div>Employees need: {order.employees_quantity}</div>}
            {order.status !== 1 && order.status !== 2 && <div>Employees now: </div>}
            {order.status !== 1 && order.status !== 2 &&order.employees_current[0] && order.employees_current.map(id => <EmployeesBuilder employee_id={id}/>)}

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
