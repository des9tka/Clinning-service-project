import {useSelector} from "react-redux";
import {OrderPhoto} from "../OrderPhoto/OrderPhoto";

const OrderDetailsPage = () => {
    const {order} = useSelector(state => state.orderReducer)
    return (
        <div>
            <div>Id: {order.id}</div>
            <div>Address: {order.address}</div>
            <div>Footage: {order.footage}</div>
            <div>Task: {order.task_description}</div>
            <div className={'order_wrap'}>
                {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>
        </div>
    )
}
export {
    OrderDetailsPage
};
