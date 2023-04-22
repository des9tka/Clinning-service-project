import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";

const CheckPermissions = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {self} = useSelector(state => state.userReducer)

    const checker = (user) => {
        if (user.is_employee && user.is_staff && user.is_superuser) {
                navigate('/superuser')
            } else if (!user.is_employee && user.is_staff && !user.is_superuser) {
                navigate('/admin')
            } else if (user.is_employee && !user.is_staff && !user.is_superuser) {
                navigate('/employee')
            } else {
                //path
            }
    }

    useEffect(() => {
        if (!self) {
            dispatch(userActions.setSelfUser()).then((data) => {
                checker(data.payload.data)
            })
        } else {
           checker(self)
        }
    }, [])
}


export {
    CheckPermissions
}