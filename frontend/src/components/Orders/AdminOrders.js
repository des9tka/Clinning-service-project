import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {order_service} from "../../services";
import {orderActions} from "../../redux";
import {AdminOrder} from "../Order";
import {useSearchParams} from "react-router-dom";
import {LoadingPage} from "../Pages";


const AdminOrders = () => {

    const dispatch = useDispatch();
    const {orders, prevPage, nextPage} = useSelector(state => state.orderReducer);
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});
    const [searcher, setSearcher] = useState(null)

     useEffect(() => {
        if (!searcher) {
            order_service.getAll(query.get('page'), query.get('status')).then(({data}) => {
                dispatch(orderActions.setOrders(data.data))
                dispatch(orderActions.setPrevPage(data.prev_page))
                dispatch(orderActions.setNextPage(data.next_page))
            }).catch((e) => console.log(e))
        } else if (searcher) {
            order_service.search(searcher, query.get('page')).then(value => {
                dispatch(orderActions.setOrders(value.data.data))
                dispatch(orderActions.setPrevPage(value.data.prev_page))
                dispatch(orderActions.setNextPage(value.data.next_page))
            }).catch((e) => console.log(e))
        }

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
            <select disabled={searcher} id={'select'} onChange={() => ordersChange()}>
                <option value={1}>waiting for approved</option>
                <option value={5}>taken</option>
                <option value={4}>rejected</option>
            </select>
            <hr/>
            {!search && <button disabled={!prevPage} onClick={() => prev()}>Prev</button>}
            {!search && <button disabled={!nextPage} onClick={() => next()}>Next</button>}

            {search && <button disabled={!prevPage} onClick={() => searchPrev()}>Prev</button>}
            {search && <button disabled={!nextPage} onClick={() => searchNext()}>Next</button>}
            <hr/>
            <div>
                <input type="text" id={'searcher'} onChange={(e) => search(e)} value={searcher}/>
                {orders && orders.map(order => <AdminOrder key={order.id} order={order}/>)}
            </div>

        </div>
    )
}

export {
    AdminOrders
};
