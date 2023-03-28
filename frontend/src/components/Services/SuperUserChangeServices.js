import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import {SuperUserChangeService} from "../Service";
import {ErrorPage, LoadingPage} from "../Pages";
import {serviceActions} from "../../redux";

const SuperUserChangeServices = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1'})
    const {services, loading, error, prevPage, nextPage} = useSelector(state => state.serviceReducer)


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

            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>

            {services && services.map(service => <SuperUserChangeService service={service} id={id}/>)}
        </div>
    )
}
export {
    SuperUserChangeServices
};
