import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {ErrorPage, LoadingPage} from "../Pages";
import {User} from "../User";
import {userActions, userReducer} from "../../redux";

const Users = () => {

    const dispatch = useDispatch();
    const {users, loading, error, prevPage, nextPage} = useSelector(state => state.userReducer);
    const [query, setQuery] = useSearchParams({page: '1'});
    const [searcher, setSearcher] = useState('');
    const [state, setState] = useState({
        update: 0,
        delUser: false
    })

    useEffect(() => {
        dispatch(userActions.setAllUsers({query, searcher}));
        dispatch(userActions.setSelfUser());
    }, [query, searcher, state])

    const prev = () => {
        setQuery(value => ({page: query.get('page') - 1}));
    }

    const next = () => {
        setQuery(value => ({page: +query.get('page') + 1}));
    }

    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <div className={'buttons-wrap'}>
                <button className={'prev-button'} disabled={!prevPage} onClick={() => prev()}>Prev</button>
                <input className={'searcher'} placeholder={'search...'} type="text" id={'searcher'} onChange={(e) => {
                    dispatch(userActions.setLoading(true))
                    setTimeout(() => {
                        setSearcher(e.target.value)
                        dispatch(userActions.setLoading(false))
                    }, 2000)
                }}/>
                <button className={'next-button'} disabled={!nextPage} onClick={() => next()}>Next</button>
            </div>
            <div className={'users-div'}>
                {users && users.map(user => <User state={state} setState={setState} user={user}/>)}
            </div>
        </div>
    )
}

export {
    Users
};