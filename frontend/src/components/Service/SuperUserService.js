import {useNavigate} from "react-router-dom";

const SuperUserService = ({service}) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/superuser/services/${service.id}/details`)} className={'service-div'}>
            <div>Id: {service.id}</div>
            <div>Name: {service.name}</div>
            <div>Address: {service.address}</div>
            <div>City: {service.city}</div>
        </div>
    )
}
export {
    SuperUserService
};
