import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {serviceActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {SuperUserService} from "../Service";
import {ServiceForm} from "../Forms";

const SuperUserServices = () => {

    const dispatch = useDispatch();
    const {services, nextPage, prevPage, loading, error} = useSelector(state => state.serviceReducer)
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(() => {
        dispatch(serviceActions.setAllServices({query}))
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
