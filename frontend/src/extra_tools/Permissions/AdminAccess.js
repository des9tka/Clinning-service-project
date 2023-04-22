import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";


const AdminAccess = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {self} = useSelector(state => state.userReducer);

    const checker = (user) => {
        if (user.is_staff && !user.is_employee && !user.is_superuser) {
            //path
        } else {
            navigate('/auth')
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
    AdminAccess
};