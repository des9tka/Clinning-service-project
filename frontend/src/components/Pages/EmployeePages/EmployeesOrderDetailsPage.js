import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {ErrorPage, LoadingPage} from "../CommonPages";
import {PhotosBuilder} from "../../PhotoBuilder";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {EmployeeOrderButtons} from "../../Order/EmployeeOrderButtons";
import {orderActions, userActions} from "../../../redux";

const EmployeesOrderDetailsPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch();
    const {self, users} = useSelector(state => state.userReducer)
    const {loading, error, order} = useSelector(state => state.orderReducer)
    const [change, setChange] = useState(0)

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
        dispatch(userActions.setOrderEmployeesByOrderId({id}))
    }, [change])

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
                <div>Price: {order.price}</div>
                <div>Date: {order.date}</div>
                <div>Time: {order.time}</div>
                <div>Status: {order.status}</div>
                <div>Rating: {order.rating}</div>
                <div>Footage: {order.footage}</div>
                <div className={'task-div'}>Task: {order.task_description}</div>
                <div>Employees: {order.employees_current.length}/{order.employees_quantity}</div>

                <div className={'order_photo_wrap'}>
                    {order.photos.map((photo, index) => <PhotosBuilder key={index} photo={photo}/>)}
                </div>

                <h3>Employees</h3>
                <div className={'employee-wrapper'}>
                    {users && users.map(employee => <EmployeesBuilder employee={employee}/>)}
                </div>

                <EmployeeOrderButtons setChange={setChange} order={order} user={self}/>
                <hr/>
            </div>
        </div>
    )
}


export {
    EmployeesOrderDetailsPage
};