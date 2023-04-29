import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


import {order_service} from "../../../services";
import {PhotosBuilder} from "../../PhotoBuilder";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {orderActions, userActions} from "../../../redux";
import {LoadingPage, ErrorPage} from "../CommonPages";
import {AdminOrderButtons} from "../../Order";

const AdminOrderDetailsPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [state, setState] = useState({
        'button': false,
        'message': '',
        'price': null,
        'employees': null

    });
    const {order, loading, error} = useSelector(state => state.orderReducer)
    const {users} = useSelector(state => state.userReducer)

    const orderConfirm = async (updatesOrder) => {
        await order_service.update(order.id, updatesOrder)
        navigate('/admin/orders')
    }

    useEffect(() => {
        dispatch(orderActions.setOrderById({id}))
        dispatch(userActions.setOrderEmployeesByOrderId({id}))
    }, [])

    if (!order) {
        return (
            <LoadingPage/>
        )
    }

    const reject = async () => {
        await order_service.reject(order.id, state.message)
        navigate('/admin/orders')
    }

    return (
        <div className={'order-details-page-wrap'}>
            <div className={'order-details-div'}>
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
                <div>Rating: {order.rating}</div>
                {order.price !== 0 && <div>Price: {order.price}</div>}

                <div className={'order_photo_wrap'}>
                    {order.photos.map((photo, index) => <PhotosBuilder key={index} photo={photo}/>)}
                </div>

                {order.status !== 1 && <div>Employees need: {order.employees_quantity}</div>}
                {order.status !== 1 && <div>Employees now: </div>}
                <div className={'employees-wrapper'}>
                    {order.status !== 1 && users && order.employees_current[0] && users.map(user => <EmployeesBuilder employee={user} order_id={order.id}
                                                                                                                      status={order.status}/>)}
                </div>

                {(order.status === 1 && !state.button) && <form className={'admin-order-form'} onSubmit={handleSubmit(orderConfirm)}>

                    <div className={'admin-order-inputs'}>
                        <input type={'number'} placeholder={'Price'} {...register('price')} onChange={(e) => setState(prevState => {
                            return ({...prevState, price: e.target.value})
                        })}/>

                        <input type="number" placeholder={'Employees Quantity'} {...register('employees_quantity')} onChange={(e) => setState((prevState) => {
                            return ({...prevState, employees: e.target.value})
                        })}/>
                    </div>

                    <AdminOrderButtons state={state} setState={setState} status={order.status}/>
                </form>}

                {state.button && <div className={'reject-div'}>
                    <input id={'input'} type={'text'} placeholder={'Reason for rejecting'} onChange={(e) => setState((prevState) => {
                        return ({...prevState, message: e.target.value})
                    })}/>
                    <br/>
                    <button className={'reject-button'} disabled={state.message === ''} onClick={() => reject()}>Reject</button>
                </div>}
                <hr/>
            </div>
        </div>
    )
}

export {
    AdminOrderDetailsPage
};
