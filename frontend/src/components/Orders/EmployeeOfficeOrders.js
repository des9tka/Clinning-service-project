import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import {ErrorPage, LoadingPage} from "../Pages";
import {EmployeeOrder} from "../Order";
import {useSearchParams} from "react-router-dom";

const EmployeeOfficeOrders = () => {

    const dispatch = useDispatch();
    const {orders, loading, error, nextPage, prevPage} = useSelector(state => state.orderReducer)
    const [query, setQuery] = useSearchParams({page: '1'});
    const [searcher, setSearcher] = useState('')
    const [button, settButton] = useState('done');

    useEffect(() => {
        dispatch(orderActions.setEmployeeOrders({query, searcher}))
            .catch((e) => console.log(e))
    }, [query, searcher])

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1}))
    }

    const search = (e) => {
        let data = e.target.value
        let symbol = "&";
        data = data.replace(/\s+/g, symbol);
        if (data === ' ') {
            setSearcher(null)
        } else {
            setSearcher(data)
        }
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
                <input className={'employee-order-searcher'} type="text" id={'searcher'} onChange={(e) => search(e)} value={searcher}/>
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
