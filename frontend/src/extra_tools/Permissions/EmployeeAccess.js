import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {userActions} from "../../redux";


const EmployeeAccess = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.setSelfUser()).then((response) => {
            if (response.payload.data.is_employee && !response.payload.data.is_staff && !response.payload.data.is_superuser) {
            //path
        } else {
            navigate('/auth')
        }
        })
    }, [])

}


export {
    EmployeeAccess
};
