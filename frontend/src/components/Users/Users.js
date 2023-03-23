import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {ErrorPage, LoadingPage} from "../Pages";
import {User} from "../User/User";
import {userActions} from "../../redux";

const Users = () => {

    const dispatch = useDispatch();
    const {users, loading, error, prevPage, nextPage} = useSelector(state => state.userReducer)
    const [query, setQuery] = useSearchParams({page: '1'});


    useEffect(async () => {
        await dispatch(userActions.setAllUsers({query}))
        await dispatch(userActions.setSelfUser())
    }, [])

    if (users === []) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    const prev = () => {
        setQuery(value => ({page: value.get('page') - 1}))
        console.log(query)
    }

    const next = () => {
        setQuery(value => ({page: value.get('page') + 1}))
         console.log(query)
    }


    return (
        <div>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}

            <button disabled={!prevPage} onClick={() => prev()}>Prev</button>
            <button disabled={!nextPage} onClick={() => next()}>Next</button>

            {users && users.map(user => <User user={user}/>)}
        </div>
    )
}

export {
    Users
};