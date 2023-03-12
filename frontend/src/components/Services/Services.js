import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {c_service_service} from "../../services";
import {serviceActions} from "../../redux";
import {Service} from "../Service/Service";

const Services = () => {
    const dispatch = useDispatch();
    const {services} = useSelector(state => state.serviceReducer);

    useEffect(() => {
        c_service_service.getAll().then(value => {
            dispatch(serviceActions.setServices(value.data.data));
        })
    },[])

    return (
        <div>
            {services.map(service => <Service key={service.id} service={service}/>)}
        </div>
    )
}
export {
    Services
};
