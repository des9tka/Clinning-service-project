import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {user_service} from "../../services";

const CheckPermissions = () => {

    const navigate = useNavigate();

    useEffect(() => {
        user_service.getSelf().then(({data}) => {

            localStorage.removeItem('is_employee')
            localStorage.removeItem('is_staff')
            localStorage.removeItem('is_superuser')

            localStorage.setItem('is_employee', data.is_employee)
            localStorage.setItem('is_staff', data.is_staff)
            localStorage.setItem('is_superuser', data.is_superuser)


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