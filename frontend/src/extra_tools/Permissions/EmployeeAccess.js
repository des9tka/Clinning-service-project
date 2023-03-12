import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const EmployeeAccess = () => {

    const navigate = useNavigate();

    const is_employee = localStorage.getItem('is_employee')
    const is_staff = localStorage.getItem('is_staff')
    const is_superuser = localStorage.getItem('is_superuser')

    useEffect(() => {
        if (is_employee === 'true' && is_staff === 'false' && is_superuser === 'false') {
            //path
        } else {
            navigate('/auth')
        }
    }, [])

}


export {
    EmployeeAccess
};
