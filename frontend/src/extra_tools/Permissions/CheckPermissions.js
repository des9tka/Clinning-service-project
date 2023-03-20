import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {user_service} from "../../services";

const CheckPermissions = () => {

    const navigate = useNavigate();

    useEffect(() => {
        user_service.getSelf().then(({data}) => {

            if (data.is_employee && data.is_staff && data.is_superuser) {
                navigate('/superuser')
            } else if (!data.is_employee && data.is_staff && !data.is_superuser) {
                navigate('/admin')
            } else if (data.is_employee && !data.is_staff && !data.is_superuser) {
                navigate('/employee')
            } else {
                //path
            }
        })
    }, [])
}


export {
    CheckPermissions
}