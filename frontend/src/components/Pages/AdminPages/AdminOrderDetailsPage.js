import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";


import {order_service} from "../../../services";
import {OrderPhoto} from "../../OrderPhoto";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {orderActions} from "../../../redux";
import {LoadingPage, ErrorPage} from "../CommonPages";
import {AdminOrderButtons} from "../../Order";

const AdminOrderDetailsPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {order, loading, error} = useSelector(state => state.orderReducer)
    const {register, handleSubmit} = useForm();

    const orderConfirm = async (updatesOrder) => {
        await order_service.update(order.id, updatesOrder)
        navigate('/admin/orders')
    }

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
    }, [])

    if (!order) {
        return (
            <LoadingPage/>
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
            <div>Status: {order.status}</div>
            {order.price !== 0 && <div>Price: {order.price}</div>}

            <div className={'order_wrap'}>
                {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>

            {<div>Employees need: {order.employees_quantity}</div>}
            {order.status !== 1 && <div>Employees now: </div>}
            {order.status !== 1 && order.employees_current[0] && order.employees_current.map(employee_id => <EmployeesBuilder employee_id={employee_id} order_id={order.id}
                                                                                                                     status={order.status}/>)}

            {order.status === 1 && <form onSubmit={handleSubmit(orderConfirm)}>
                <input type="text" placeholder={'Price'} {...register('price')}/>
                <input type="text" placeholder={'Employees Quantity'} {...register('employees_quantity')}/>
                <AdminOrderButtons status={order.status}/>
            </form>}

            <hr/>
        </div>
    )
}
export {
    AdminOrderDetailsPage
};
