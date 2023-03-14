import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {LoadingPage} from "../Pages";
import {User} from "../User/User";
import {userActions} from "../../redux";
import {user_service} from "../../services";

const Users = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.userReducer)

    useEffect(() => {
        user_service.getAll().then(({data}) => dispatch(userActions.setUsers(data.data)))
    }, [])


    if (users.length === 0) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <div>
            {users && users.map(user => <User user={user}/>)}
        </div>
    )
}
export {
    Users
};