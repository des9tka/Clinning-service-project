import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {userActions} from "../../../redux";
import {LoadingPage} from "./LoadingPage";
import {ErrorPage} from "./ErrorPage";
import {EmployeesBuilder} from "../../EmployeesBuilder";

const HomePage = () => {

    const {users, error, loading} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setBestEmployee())
    },[])

    return (
        <div className={'home-page-div'}>
            {loading && <LoadingPage/>}
            {error && <ErrorPage error={error}/>}
            <div className={'phone-div'}>
                <div className={'phone'}>Phone number</div>
            </div>
            <h1 className={'head'}>Cleaning Service</h1>
            <h3 className={'description'}>About Company</h3>
            <div className={'employee-wrap'}>
                {users && users.map(user => <EmployeesBuilder employee={user}/>)}
            </div>
        </div>
    )
}


export {
    HomePage
};
