import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import {password_validator} from "../../../validators";
import {auth_service} from "../../../services";
import {PasswordExpiredTokenModal} from "../../Modals/PasswordExpiredTokenModal";
import {useState} from "react";

const RecoveryPasswordPage = () => {

    const {token} = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState(false);

    const {handleSubmit, register, formState: {isValid, errors}, setError, reset} = useForm({
        mode: 'all',
        resolver: joiResolver(password_validator)
    });

    const matching = (e) => {
        const first = document.getElementById('first').value
        let errorOption = {
            message: "Passwords aren`t matching!",
        };
        if (first !== e.target.value) {
            setError('password', errorOption)
        } else {
            setError('password', null)
        }
    }

    const change = (password) => {
        auth_service.change_password(token, password).then(() => {
            navigate('/auth/login')
        }).catch((e) => {
            if (e.response.data === 'Same password.') {
                setState(null)
                reset()
            } else if (e.response.data?.details === 'Token invalid or expired.') {
                setState(true)
            }
        })
    }

    return (
        <div className={'password-recovery-div'}>
            <form className={'password-recovery-form'} onSubmit={handleSubmit(change)}>
                {state && <PasswordExpiredTokenModal navigate={navigate}/>}
                {state === null && <div className={'errors'}>Same password.</div>}
                <div>
                    {errors.password && <div className={'error-message'}>{errors.password.message}</div>}
                    <label className={'recovery-page-label'} htmlFor="password">New Password</label>
                    <input type="password" id={'first'} onClick={() => setState(false)} {...register('password')}/>
                </div>
                <div className="form-group">
                    <label className={'recovery-page-label'} htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" disabled={(errors.password && errors.password.message !== 'Passwords aren`t matching!')} id={'second'}
                           onChange={(e) => matching(e)}/>
                </div>
                <button className={'submit-button'} disabled={!isValid && !errors.password}>Change password</button>
            </form>
        </div>
    )
}

export {
    RecoveryPasswordPage
};
