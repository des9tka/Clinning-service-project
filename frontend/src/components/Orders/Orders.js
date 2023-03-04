import {Order} from "../Order/Order";
import {useEffect, useState} from "react";
import {user_service} from "../../services";

const Orders = () => {
    const [orders, setOrders] = useState();
    useEffect(() => {
        user_service.getOrders().then(value => setOrders(value.data))

    },[])
    return (
        <div>
            {orders && orders.map(order => <Order key={order.id} order={order}/>)}
        </div>
    )
}
export {Orders};
