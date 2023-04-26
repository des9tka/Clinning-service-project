import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useState} from "react";

import {email_validator} from "../../../validators";
import {auth_service} from "../../../services";

const RecoveryPasswordRequestPage = () => {

    const [message, setMessage] = useState('')
    const {handleSubmit, formState: {isValid, errors}, register} = useForm({
        mode: 'all',
        resolver: joiResolver(email_validator)
    });

    const restore = (email) => {
        auth_service.request_password_recovery(email).then(() => setMessage('Recovery Link was sanded to your mail')).catch((e) => setMessage(e.response.data))
    }

    return (
        <div className={'request-recovery-password-div'}>
            <form onSubmit={handleSubmit(restore)} className={'request-recovery-password-form'}>
                {errors.email && <div className={'error-message'}>{errors.email.message}</div>}
                {message && <div className={'message'}>{message}</div>}
                <label htmlFor="email" className={'password-label'}>Email</label>
                <input type="text" {...register('email')} className={'email-input'}/>
                <button className={'submit-button'} disabled={!isValid}>Change Password</button>
            </form>
        </div>
    )
}

export {
    RecoveryPasswordRequestPage
};
