import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {ErrorPage, LoadingPage} from "../Pages";
import {User} from "../User";
import {userActions} from "../../redux";

const Users = () => {

    const dispatch = useDispatch();
    const {users, loading, error, prevPage, nextPage} = useSelector(state => state.userReducer);
    const [query, setQuery] = useSearchParams({page: '1'});
    const [searcher, setSearcher] = useState('')


    useEffect(() => {
        dispatch(userActions.setAllUsers({query, searcher}));
        dispatch(userActions.setSelfUser());
    }, [query, searcher])

    const prev = () => {
        setQuery(value => ({page: query.get('page') - 1}));
    }

    const next = () => {
        setQuery(value => ({page: +query.get('page') + 1}));
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
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>

            <div>
                <input type="text" id={'searcher'} onChange={(e) => search(e)} value={searcher}/>
                {users && users.map(user => <User user={user}/>)}
            </div>
        </div>
    )
}

export {
    Users
};