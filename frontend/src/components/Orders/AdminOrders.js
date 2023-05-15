import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {orderActions} from "../../redux";
import {AdminOrder} from "../Order";
import {LoadingPage} from "../Pages";


const AdminOrders = () => {

    const dispatch = useDispatch();
    const [searcher, setSearcher] = useState(null)
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});
    const {orders, prevPage, nextPage} = useSelector(state => state.orderReducer);

    useEffect(() => {
        dispatch(orderActions.setAllOrders({page: query.get('page'), status: query.get('status'), search: (searcher ? searcher : "")}))
    }, [query, searcher])


    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1, status: value.get('status')}))
    }

    const next = () => {
        setQuery(value => ({page: +value.get('page') + 1, status: value.get('status')}))
    }

    const searchPrev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
    }

    const searchNext = () => {
        setQuery(value => ({page: +value.get('page') + 1}))
    }

    const ordersChange = () => {
        const statusValue = document.getElementById('select').value
        setQuery(value => ({page: '1', status: statusValue}))
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

    if (!orders) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            <div className={'buttons-wrap'}>
                {!search && <button className={'prev-button'} disabled={!prevPage} onClick={() => prev()}>Prev</button>}
                {search && <button className={'prev-button'} disabled={!prevPage} onClick={() => searchPrev()}>Prev</button>}

                <select className={'order-select'} disabled={searcher} id={'select'} onChange={() => ordersChange()}>
                    <option value={1}>waiting for approve</option>
                    <option value={5}>taken</option>
                    <option value={4}>rejected</option>
                </select>

                {!search && <button className={'next-button'} disabled={!nextPage} onClick={() => next()}>Next</button>}
                {search && <button className={'next-button'} disabled={!nextPage} onClick={() => searchNext()}>Next</button>}
            </div>

            <div>
                <input className={'order-searcher'} type="text" id={'searcher'} placeholder={'search...'} onChange={(e) => search(e)} value={searcher}/>
                <div className={'admin-orders-div'}>
                    {orders && orders.map(order => <AdminOrder key={order.id} order={order}/>)}
                </div>
            </div>

        </div>
    )
}

export {
    AdminOrders
};
