import {useNavigate} from "react-router-dom";

import {user_service} from "../../services";

const OrderService = ({service}) => {

    const navigate = useNavigate();

    const changeService = () => {
        user_service.changeService(service.id).then(() => {
            navigate('/office/create_order')
        })
    }

    return (
        <div className={'service-div'}>
            <div>Name: {service.name}</div>
            <div>City: {service.city}</div>
            <div>Address: {service.address}</div>
            <div>Service_id: {service.id}</div>
            <button onClick={() => changeService()} className={'service-button'}>Change Service</button>
        </div>
    )
}
export {
    OrderService
};
