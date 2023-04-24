import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useState} from "react";

import {password_validator} from "../../../validators";
import {auth_service} from "../../../services";

const RecoveryPasswordPage = () => {

    const {token} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(' ');

    const {handleSubmit, register, formState: {isValid, errors}} = useForm({
        mode: 'all',
        resolver: joiResolver(password_validator)
    });


    const first = document.getElementById('first')

    const matching = (e) => {
        if (first.value !== e.target.value) {
            setMessage('Passwords arent matching')
        } else {
            setMessage('')
        }
    }

    const change = (password) => {
        auth_service.change_password(token, password).then(() => {
            navigate('/auth/login')
        }).catch((e) => {
            setMessage(e.response.data)
        })
    }

    return (
        <div className={'password-recovery-div'}>
            <form className={'password-recovery-form'} onSubmit={handleSubmit(change)}>
                <div>
                    {errors.password && <div className={'error-message'}>{errors.password.message}</div>}
                    {message !== '' && <div className={'message'}>{message}</div>}
                    <label className={'recovery-page-label'} htmlFor="password">New Password</label>
                    <input type="password" id={'first'} {...register('password')}/>
                </div>
                <div className="form-group">
                    <label className={'recovery-page-label'} htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id={'second'} onChange={(e) => matching(e)}/>
                </div>
                <button className={'submit-button'} disabled={!isValid || message !== ''}>Change password</button>
            </form>
        </div>
    )
}


export {
    RecoveryPasswordPage
};
