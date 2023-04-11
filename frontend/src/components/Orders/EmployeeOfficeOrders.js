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
            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>

            <input type="text" id={'searcher'} onChange={(e) => search(e)} value={searcher}/>

            <br/>

            <button onClick={() => buttonChange()}>{button}</button>

            {button === 'done' && <div>
                <h3>Taken:</h3>
                {orders[0] && orders.filter(order => order.status === 5 || order.status === 3).map(order => <EmployeeOrder order={order}/>)}
            </div>}
            <hr/>
            {button === 'taken' && <div>
                <h3>Done:</h3>
                {orders[0] && orders.filter(order => order.status === 6 || order.status === 7).map(order => <EmployeeOrder order={order}/>)}
            </div>}

        </div>
    )
}

export {
    EmployeeOfficeOrders
};
