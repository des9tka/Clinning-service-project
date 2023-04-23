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
        <div onClick={() => changeService()} className={'service-div'}>
            <div>Service - {service.id}</div>
            <div>Name: {service.name}</div>
            <div>City: {service.city}</div>
            <div>Address: {service.address}</div>
        </div>
    )
}
export {
    OrderService
};
