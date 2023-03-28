import {user_service} from "../../services";
import {useNavigate} from "react-router-dom";

const OrderService = ({service}) => {

    const navigate = useNavigate();

    const changeService = () => {
        user_service.changeService(service.id).then(() => {
            navigate('/office/create_order')
        })
    }

    return (
        <div>
            <div>Name: {service.name}</div>
            <div>City: {service.city}</div>
            <div>Address: {service.address}</div>
            <div>Service_id: {service.id}</div>
            <button onClick={() => changeService()}>Change Service</button>
            <hr/>
        </div>
    )
}
export {
    OrderService
};
