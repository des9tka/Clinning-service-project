import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {orderActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {EmployeeOrder} from "../Order";

const EmployeeOfficeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error, nextPage, prevPage} = useSelector(state => state.orderReducer)
    const [query, setQuery] = useSearchParams({page: '1'});
    const [button, settButton] = useState('done');

    useEffect(() => {
        dispatch(orderActions.setEmployeeOrders({query, status: 3}))
            .catch((e) => console.log(e))
    }, [query])

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1}))
    }

    const buttonChange = () => {
        if (button === 'done') {
            settButton('taken')
        } else {
            settButton('done')
        }
    }

    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <div className={'buttons-wrap'}>
                <button className={'prev-button'} disabled={!prevPage} onClick={() => prev()}>Prev</button>
                <button className={'next-button'} disabled={!nextPage} onClick={() => next()}>Next</button>
            </div>

            <hr/>

            {button === 'done' && <div>
                <div className={'employee-header-wrapper'}>
                    <h2 onClick={() => buttonChange()} className={'employee-order-headers'}>TAKEN</h2>
                 </div>
                <div className={'employee-office-orders-div'}>
                    {orders[0] && orders.filter(order => order.status === 5 || order.status === 3).map(order => <EmployeeOrder order={order}/>)}
                </div>
            </div>}

            {button === 'taken' && <div>
                <div className={'employee-header-wrapper'}>
                    <h2 onClick={() => buttonChange()} className={'employee-order-headers'}>DONE</h2>
                </div>
                <div className={'employee-office-orders-div'}>
                    {orders[0] && orders.filter(order => order.status === 6 || order.status === 7).map(order => <EmployeeOrder order={order}/>)}
                </div>
            </div>}
        </div>
    )
}

export {
    EmployeeOfficeOrders
};
