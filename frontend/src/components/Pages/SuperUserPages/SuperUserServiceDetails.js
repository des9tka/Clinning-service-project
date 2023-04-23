import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {serviceActions} from "../../../redux";
import {LoadingPage} from "../CommonPages";
import {c_service_service} from "../../../services";
import {OrderPhotosBuilder} from "../../OrderPhoto";

const SuperUserServiceDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {service} = useSelector(state => state.serviceReducer)

    useEffect(() => {
        dispatch(serviceActions.setServiceById({id}))
    }, [])

    const deleteService = async () => {
        const prom = prompt(`Are you sure to delete service? Write "${service.name}" for confirm:`)
        if (prom === service.name) {
            await c_service_service.delete(service.id)
                .then(() => window.location.reload())
                .catch((err) => console.log(err))
        }
    }

    if (!service) {
        return <LoadingPage/>
    }

    return (
        <div className={'service-details-div'}>
            <div className={'service-details'}>
                <div>Id: {service.id}</div>
                <div>Name: {service.name}</div>
                <div>Address: {service.address}</div>
                <div>City: {service.city}</div>

                <div className={'service_photo_wrap'}>
                    {service.photos.map(photo => <OrderPhotosBuilder photo={photo}/>)}
                </div>
                <button onClick={() => deleteService()}>Delete {service.name}</button>
            </div>
        </div>
    )
}


export {
    SuperUserServiceDetails
};
