import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {EmployeesBuilder} from "../EmployeesBuilder";
import {order_service, user_service} from "../../services";
import {userActions} from "../../redux";
import {OrderPhotosBuilder} from "../OrderPhoto";
import {ErrorPage, LoadingPage} from "../Pages";
import {EmployeeOrderButtons} from "./EmployeeOrderButtons";

const EmployeeOrder = ({order}) => {

    const dispatch = useDispatch()
    const {user, loading, error} = useSelector(state => state.userReducer)


    useEffect(() => {
        dispatch(userActions.setSelfUser())
    }, [])



    if (!user) {
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

            <div className={'order_photo_wrap'}>
                {order.photos.map((photo, index) => <OrderPhotosBuilder key={index} photo={photo}/>)}
            </div>

            <div>Employees: {order.employees_current.length}/{order.employees_quantity}</div>
            {order.employees_current[0] && order.employees_current.map(employee_id => <EmployeesBuilder employee_id={employee_id}/>)}

            <EmployeeOrderButtons order={order} user={user}/>
            <hr/>
        </div>
    )
}
export {
    EmployeeOrder
};
