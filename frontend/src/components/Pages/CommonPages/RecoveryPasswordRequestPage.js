import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import {email_validator} from "../../../validators";
import {auth_service} from "../../../services";
import {useState} from "react";

const RecoveryPasswordRequestPage = () => {

    const [message, setMessage] = useState('')
    const {handleSubmit, formState: {isValid, errors}, register} = useForm({
        mode: 'all',
        resolver: joiResolver(email_validator)
    });

    const restore = (email) => {
        auth_service.request_password_recovery(email).then(() => setMessage('Recovery Link was sanded to your mail')).catch((e) => console.log(e))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(restore)}>
                {errors.email && <div>{errors.email.message}</div>}
                {message && <div>{message}</div>}
                <input type="text" placeholder={'email'} {...register('email')}/>
                <button disabled={!isValid}>Change Password</button>
            </form>
        </div>
    )
}
export {
    RecoveryPasswordRequestPage
};
