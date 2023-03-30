import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {orderActions} from "../../../redux";
import {EmployeesBuilder} from "../../EmployeesBuilder";
import {PhotosBuilder} from "../../OrderPhoto";
import {LoadingPage, ErrorPage} from "../CommonPages";
import {order_service} from "../../../services";

const SuperUserDetailsPage = () => {

    const {order, loading, error} = useSelector(state => state.orderReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
       dispatch(orderActions.setOrderById({id}))
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
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

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

            <div className={'order_photo_wrap'}>
                 {order.photos.map((photo, index) => <PhotosBuilder key={index} photo={photo}/>)}
            </div>
            <button onClick={() => deleteOrder()}>Delete</button>
        </div>
    )
}
export {
    SuperUserDetailsPage
};
