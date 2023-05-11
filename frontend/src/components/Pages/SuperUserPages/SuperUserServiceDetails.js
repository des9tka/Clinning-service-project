import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {serviceActions} from "../../../redux";
import {ErrorPage, LoadingPage} from "../CommonPages";
import {c_service_service} from "../../../services";
import {PhotosBuilder} from "../../PhotoBuilder";
import {service_validator} from "../../../validators";

const SuperUserServiceDetails = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [updated, setUpdated] = useState(0);
    const {service, loading, error} = useSelector(state => state.serviceReducer);


    const {register, handleSubmit, setValue, formState: {isValid, errors}} = useForm({
        mode: 'all',
        resolver: joiResolver(service_validator)
    });

    useEffect(() => {
        dispatch(serviceActions.setServiceById({id})).then((data) => {
            setValue('name', data.payload.data.name)
            setValue('address', data.payload.data.address)
            setValue('city', data.payload.data.city)
        })
    }, [])

    const deleteService = async () => {
        const prom = prompt(`Are you sure to delete service? Write "${service.name}" for confirm:`)
        if (prom === service.name) {
            await c_service_service.delete(service.id)
                .then(() => navigate('/superuser/services'))
                .catch((err) => {
                    return <ErrorPage error={err}/>
                })
        }
    }

    if (!service) {
        return <LoadingPage/>
    }

    const serviceUpdate = (data) => {
        c_service_service.updateById(service.id, data).catch((err) => {
            return <ErrorPage error={err.response.data}/>
        })
    }

    return (
        <div className={'service-details-div'}>
            {loading && <LoadingPage/>}
            {error && <ErrorPage/>}
            <div className={'service-details'}>
                <form className={'service-form'} onSubmit={handleSubmit(serviceUpdate)}>
                    <label>Id - {service.id}</label>

                    <label>City</label>
                    <input type="text" {...register('city', {required: true, minLength: 2, maxLength: 30})}/>

                    <label>Service name</label>
                    <input type="text" {...register('name', {required: true, minLength: 2, maxLength: 30})}/>

                    <label>Service address</label>
                    <input type="text" {...register('address', {required: true, minLength: 2, maxLength: 50})}/>

                    <button className={'green'} disabled={!isValid}>Update</button>
                </form>

                <div className={'service-errors-div'}>
                    <div className={'errors'}>
                        {errors.city && <div>{errors.city.message}</div>}
                        {errors.name && <div>{errors.name.message}</div>}
                        {errors.address && <div>{errors.address.message}</div>}
                    </div>
                </div>

                <div className={'service_photo_wrap'}>
                    {service.photos.map(photo => <PhotosBuilder photo={photo}/>)}
                </div>
                <button onClick={() => deleteService()}>Delete {service.name}</button>
            </div>
        </div>
    )
}

export {
    SuperUserServiceDetails
};
