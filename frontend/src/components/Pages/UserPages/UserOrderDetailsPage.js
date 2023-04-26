import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {UserOrderButtons} from "../../Order";
import {PhotosBuilder} from "../../PhotoBuilder";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {orderActions, userActions} from "../../../redux";
import {LoadingPage, ErrorPage} from "../CommonPages";

const UserOrderDetailsPage = () => {

    const {order, loading, error} = useSelector(state => state.orderReducer)
    const {users} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const {id} = useParams();

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
            <div className={'order-details-page-wrap'}>
                {loading && <LoadingPage/>}
                {error && <ErrorPage/>}
                <div className={'order-details-div'}>
                    <div>Id: {order.id}</div>
                    <div>Address: {order.address}</div>
                    <div>Footage: {order.footage}</div>
                    <div>Task: {order.task_description}</div>
                    <div>Service: {order.service}</div>
                    <div>Date: {order.date}</div>
                    <div>Time: {order.time}</div>

                    {(order.status === 6 && order.status === 7) && <div>Rating: {order.rating}</div>}
                    {order.status !== 1 && <div>Price: {order.price}</div>}
                    {order.status !== 1 && <div>Employees need: {order.employees_quantity}</div>}


                    <div className={'order_photo_wrap'}>
                        {order.photos.map((photo, index) => <PhotosBuilder key={index} photo={photo}/>)}
                    </div>

                    {order.status !== 1 && order.status !== 2 && <h3>Employees</h3>}
                    <div className={'employee-wrapper'}>
                        {order.status !== 1 && order.status !== 2 && order.employees_current[0] && users.map(employee => <EmployeesBuilder
                            employee={employee}/>)}
                    </div>

                    <div className={'superuser-button-wrapper'}>
                        <UserOrderButtons id={order.id} status={order.status}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    UserOrderDetailsPage
};
