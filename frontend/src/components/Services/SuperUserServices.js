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
    }, [query, dispatch])

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

            <div className={'services-div'}>
                <div className={'service-form-div'}>
                    <ServiceForm/>
                </div>
                <div className={'services-wrap'}>
                    {services && services.map(service => <SuperUserService service={service}/>)}
                </div>
            </div>

            <div className={'service-buttons-wrap'}>
                <button className={'prev-button'} disabled={!prevPage} onClick={() => prev()}>prev</button>
                <button className={'next-button'} disabled={!nextPage} onClick={() => next()}>next</button>
            </div>
        </div>
    )
}

export {
    SuperUserServices
};
