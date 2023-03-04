import {OrderPhoto} from "../OrderPhoto/OrderPhoto";

const Order = ({order}) => {

    return (
        <div>
            <div>id:{order.id}</div>
            <div>address:{order.address}</div>
            <div>time: {order.time}</div>
            <div>price:{order.price}</div>
            <div>task:{order.task_description}</div>
            <div>userId:{order.user}</div>
            <div className={'order_wrap'}>
                {order.photos.map((photo, index) => <OrderPhoto key={index} photo={photo}/>)}
            </div>
            <hr/>
        </div>
    )
}
export {Order};
