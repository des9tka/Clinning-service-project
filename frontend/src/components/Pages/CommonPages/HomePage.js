import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {userActions} from "../../../redux";

const HomePage = () => {

    const {users, error, loading} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setBestEmployee())
    },[])

    return (
        <div>
            <div>Phone number</div>
            <h1></h1>
            <h3>About Company</h3>
            <div>best 5 employee</div>
        </div>
    )
}

export {
    HomePage
};
