import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {UserOrder} from "../Order";
import {order_service} from "../../services";
import {orderActions} from "../../redux";
import {useSearchParams} from "react-router-dom";


const UserOrders = () => {
    const dispatch = useDispatch();
    const {orders, nextPage, prevPage} = useSelector(state => state.orderReducer)
    const [query, setQuery] = useSearchParams({page: '1', status: '1'});
    const [searcher, setSearcher] = useState(null)

    useEffect(() => {
        if (!searcher) {
            order_service.getAll(query.get('page'), query.get('status')).then(value => {
                dispatch(orderActions.setOrders(value.data.data))
                dispatch(orderActions.setPrevPage(value.data.prev_page))
                dispatch(orderActions.setNextPage(value.data.next_page))
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

    return (
        <div>
            <hr/>
            <select disabled={searcher} id={'select'} onChange={() => ordersChange()}>
                <option value={1}>pending</option>
                <option value={2}>waiting for approved</option>
                <option value={3}>approved</option>
                <option value={4}>rejected</option>
                <option value={5}>taken</option>
                <option value={6}>done</option>
                <option value={7}>paid</option>
            </select>
            <hr/>
            {!search && <button disabled={!prevPage} onClick={() => prev()}>Prev</button>}
            {!search && <button disabled={!nextPage} onClick={() => next()}>Next</button>}

            {search && <button disabled={!prevPage} onClick={() => searchPrev()}>Prev</button>}
            {search && <button disabled={!nextPage} onClick={() => searchNext()}>Next</button>}
            <hr/>
            <div>
                <input type="text" id={'searcher'} onChange={(e) => search(e)} value={searcher}/>
                {orders && orders.map(order => <UserOrder key={order.id} order={order}/>)}
            </div>
        </div>
    )
}
export {UserOrders};
