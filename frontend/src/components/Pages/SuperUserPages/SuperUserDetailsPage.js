import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {orderActions, userActions} from "../../../redux";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {OrderPhotosBuilder} from "../../OrderPhoto";
import {LoadingPage, ErrorPage} from "../CommonPages";
import {order_service} from "../../../services";

const SuperUserDetailsPage = () => {

    const {order, loading, error} = useSelector(state => state.orderReducer)
    const {users} = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
        dispatch(userActions.setOrderEmployeesByOrderId({id}))

    }, [])


    const deleteOrder = () => {
        order_service.delete(id)
        navigate('/superuser/orders')
        window.location.reload()
    }

    if (!order) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div className={'order-details-page-wrap'}>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}
            <div className={'order-details-div'}>
                <div>Id: {order.id}</div>
                <div>Address: {order.address}</div>
                <div>Footage: {order.footage}</div>
                <div>Task: {order.task_description}</div>
                <div>Service: {order.service}</div>
                <div>Date: {order.date}</div>
                <div>Time: {order.time}</div>
                <div>Status: {order.status}</div>
                <div>Rating: {order.rating}</div>

                {order.status !== 1 && <div>Price: {order.price}</div>}
                {order.status !== 1 && <div>Employees need: {order.employees_quantity}</div>}

                <div className={'order_photo_wrap'}>
                    {order.photos.map((photo, index) => <OrderPhotosBuilder key={index} photo={photo}/>)}
                </div>

                {order.status !== 1 && order.status !== 2 && <h3>Employees</h3>}
                <div className={'employee-wrapper'}>
                    {order.status !== 1 && order.status !== 2 && order.employees_current[0] && users.map(employee => <EmployeesBuilder
                        employee={employee}/>)}
                </div>

                <div className={'superuser-button-wrapper'}>
                    <button onClick={() => deleteOrder()}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export {
    SuperUserDetailsPage
};
