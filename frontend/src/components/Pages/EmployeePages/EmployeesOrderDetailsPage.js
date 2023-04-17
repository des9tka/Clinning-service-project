import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ErrorPage, LoadingPage} from "../CommonPages";
import {OrderPhotosBuilder} from "../../OrderPhoto";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {EmployeeOrderButtons} from "../../Order/EmployeeOrderButtons";
import {orderActions, userActions} from "../../../redux";

const EmployeesOrderDetailsPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch();
    const {self, users} = useSelector(state => state.userReducer)
    const {loading, error, order} = useSelector(state => state.orderReducer)

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
        dispatch(userActions.setOrderEmployeesByOrderId({id}))
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
            {error && <ErrorPage error={error}/>}
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Price: {order.price}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>
            <div>Status: {order.status}</div>
            <div>Rating: {order.rating}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>
            <div>Employees: {order.employees_current.length}/{order.employees_quantity}</div>

            <div className={'order_photo_wrap'}>
                {order.photos.map((photo, index) => <OrderPhotosBuilder key={index} photo={photo}/>)}
            </div>

            {users && users.map(employee => <EmployeesBuilder employee={employee}/>)}

            <EmployeeOrderButtons order={order} user={self}/>
            <hr/>
        </div>
    )
}
export {
    EmployeesOrderDetailsPage
};