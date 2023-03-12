import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useLayoutEffect} from "react";


import {order_service} from "../../services";
import {OrderPhoto} from "../OrderPhoto/OrderPhoto";
import {EmployeesBuilder} from "../EmployeesBuilder/EmployeesBuilder";
import {orderAttr} from "../../configs";
import {orderActions} from "../../redux";
import {LoadingPage} from "./LoadingPage";
import {AdminOrderButtons} from "../Order";

const AdminOrderDetailsPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {order} = useSelector(state => state.orderReducer)
    const {register, handleSubmit} = useForm();
    const {id} = useParams();

    const orderConfirm = async (updatesOrder) => {
        await order_service.update(order.id, updatesOrder)
        navigate('/admin/orders')
    }

    useEffect(() => {
        if (!order) {
            order_service.getById(id).then(({data}) => {
                dispatch(orderActions.setOrder(data))
            })
        }
    }, [id])

    if (order === null) {
        return (
            <LoadingPage/>
        )
    }

    return (
        <div>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>
            <div>Service: {order.service}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>
            <div>Status: {order.status}</div>
            {order.price !== 0 && <div>Price: {order.price}</div>}

            <div className={'order_wrap'}>
                {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>

            {<div>Employees need: {order.employees_quantity}</div>}
            {order.status !== 1 && <div>Employees now: </div>}
            {order.status !== 1 && order.employees_current[0] && order.employees_current.map(id => <EmployeesBuilder employee_id={id} order_id={order.id}
                                                                                                                     status={order.status}/>)}


            {order.status === 1 && <form onSubmit={handleSubmit(orderConfirm)}>
                <input type="text" placeholder={'Price'} {...register('price')}/>
                <input type="text" placeholder={'Employees Quantity'} {...register('employees_quantity')}/>
                <AdminOrderButtons status={order.status}/>
            </form>}

            {order.status !== 1 && <AdminOrderButtons status={order.status} order_id={order.id}/>}

            <hr/>
        </div>
    )
}
export {
    AdminOrderDetailsPage
};
