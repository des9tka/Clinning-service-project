import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {orderActions} from "../../redux";

const AdminOrder = ({order}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <div>
            <div>Address: {order.address}</div>
            <div>Date: {order.date}</div>
            <div>Time: {order.time}</div>

            <button onClick={() => {
                navigate(`/admin/order/${order.id}/details`)
                dispatch(orderActions.setOrder(order))
            }}>Details
            </button>
            <hr/>
        </div>
    )
}
export {
    AdminOrder
};
