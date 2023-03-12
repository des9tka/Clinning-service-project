import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const SuperuserAccess = () => {

    const navigate = useNavigate();

    const is_employee = localStorage.getItem('is_employee')
    const is_staff = localStorage.getItem('is_staff')
    const is_superuser = localStorage.getItem('is_superuser')

    useEffect(() => {
            if (is_employee === 'true' && is_staff === 'true' && is_superuser === 'true') {
                //path
            } else {
                navigate('/auth')
            }

        }, []
    )
}


export {
    SuperuserAccess
};
