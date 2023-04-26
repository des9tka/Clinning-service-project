import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import {EmployeeOrder} from "../Order";
import {ErrorPage, LoadingPage} from "../Pages";
import {useSearchParams} from "react-router-dom";

const EmployeeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error, nextPage, prevPage} = useSelector(state => state.orderReducer);
    const {self} = useSelector(state => state.userReducer);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(() => {
        dispatch(orderActions.setAllOrders({query, status: 3, search}))
    }, [query, search])

    if (orders === []) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1}))
    }

    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <div className={'buttons-wrap'}>
                <button className={'prev-button'} onClick={() => prev()} disabled={!prevPage}>Prev</button>
                <input className={'employee-order-searcher'}placeholder={'search...'} type="text" id={'searcher'} onChange={(e) => setSearch(e.target.value)}/>
                <button className={'next-button'} onClick={() => next()} disabled={!nextPage}>Next</button>
            </div>

            <div className={'employee-orders-div'}>
                {self && orders && orders.filter(order => order.employees_current !== order.employees_current.includes(self.id)).map(order => <EmployeeOrder
                    order={order}/>)}
            </div>
        </div>
    )
}
export {
    EmployeeOrders
};
