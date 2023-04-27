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
        <div className={'home-page-div'}>
            <div className={'phone-div'}>
                <div className={'phone'}>Phone number</div>
            </div>
            <h1 className={'head'}>Cleaning Service</h1>
            <h3 className={'description'}>About Company</h3>
            <div className={'employee-wrap'}>best 5 employee</div>
        </div>
    )
}

export {
    HomePage
};
