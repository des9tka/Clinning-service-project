import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import {EmployeeOrder} from "../Order/EmployeeOrder";
import {order_service} from "../../services";

const EmployeeOrders = () => {

    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.orderReducer)

    useEffect(() => {
        order_service.getAll(1, 3).then(({data}) => dispatch(orderActions.setOrders(data.data)))
    }, [])

    return (
        <div>
            {orders && orders.map(order => <EmployeeOrder order={order}/>)}
        </div>
    )
}
export {
    EmployeeOrders
};
