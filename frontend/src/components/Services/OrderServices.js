import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {serviceActions} from "../../redux";
import {OrderService} from "../Service";
import {ErrorPage, LoadingPage} from "../Pages";

const OrderServices = () => {
    const dispatch = useDispatch();
    const {services, loading, error, prevPage, nextPage} = useSelector(state => state.serviceReducer);
    const [query, setQuery] = useSearchParams({page: '1'});



    useEffect(() => {
        dispatch(serviceActions.setAllServices({query}))
    }, [query])

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

            <button disabled={!prevPage} onClick={() =>  prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>

            {services.map(service => <OrderService key={service.id} service={service}/>)}
        </div>
    )
}
export {
    OrderServices
};
