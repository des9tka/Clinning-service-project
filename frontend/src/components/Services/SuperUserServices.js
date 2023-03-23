import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {serviceActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {SuperUserService} from "../Service/SuperUserService";
import {useSearchParams} from "react-router-dom";
import {set} from "react-hook-form";
import {valid} from "joi";
import {ServiceForm} from "../Forms/ServiceForm/ServiceForm";

const SuperUserServices = () => {

    const dispatch = useDispatch();
    const {services, nextPage, prevPage, loading, error} = useSelector(state => state.serviceReducer)
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(() => {
        const querySet = query.get('page')
        dispatch(serviceActions.setAllServices({querySet}))
    },[query])

    const prev = () => {
        setQuery(value => ({page: query.get('page') - 1}))
    }

    const next = () => {
        setQuery(value => ({page: +query.get('page') + 1}))
    }

    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <button disabled={!prevPage} onClick={() => prev()}>prev</button>
            <button disabled={!nextPage} onClick={() => next()}>next</button>

            <ServiceForm/>

            {services && services.map(service => <SuperUserService service={service}/>)}
        </div>
    )
}
export {
    SuperUserServices
};
