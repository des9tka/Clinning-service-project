import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {orderActions} from "../../redux";

const SuperUserOrder = ({order}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={'user-order'}>
            <div>id:{order.id}</div>
            <div>address:{order.address}</div>
            <div>status:{order.status}</div>

            <button onClick={() => {
                dispatch(orderActions.setOrder(order))
                navigate(`/superuser/orders/${order.id}/details`)
            }} className={'order-details-buttons'}>Details</button>
            <hr/>
        </div>
    )
}

export {
    SuperUserOrder
};

