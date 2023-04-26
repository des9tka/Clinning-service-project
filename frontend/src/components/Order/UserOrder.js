import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {orderActions} from "../../redux";

const UserOrder = ({order}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={'user-order'}>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Time: {order.time}</div>
            <div>Task: {order.task_description.slice(0, 10)}...</div>

            <button onClick={() => {
                dispatch(orderActions.setOrder(order))
                navigate(`/office/order/${order.id}/details`)
            }} className={'order-details-buttons'}>Details</button>
        </div>
    )
}


export {
    UserOrder
};
