import {useNavigate} from "react-router-dom";

import {user_service} from "../../services";

const SuperUserChangeService = ({service, id}) => {

    const navigate = useNavigate();

    const changeService = () => {
        user_service.change_employee_service(id, service.id).then(() => {
            navigate('/superuser/users')
        }).catch((e) => console.log(e))
    }

    return (
        <div className={'service-div'}>
            <div>Name: {service.name}</div>
            <div>City: {service.city}</div>
            <div>Address: {service.address}</div>
            <div>Service_id: {service.id}</div>
            <button onClick={() => changeService()}>Change Service</button>
        </div>
    )
}
export {
    SuperUserChangeService
};
