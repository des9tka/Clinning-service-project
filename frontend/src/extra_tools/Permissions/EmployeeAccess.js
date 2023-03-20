import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {user_service} from "../../services";


const EmployeeAccess = () => {

    const navigate = useNavigate();

    useEffect(() => {
        user_service.getSelf().then(({data}) => {
            if (data.is_employee && !data.is_staff && !data.is_superuser) {
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
