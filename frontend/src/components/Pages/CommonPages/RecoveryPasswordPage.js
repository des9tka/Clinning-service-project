import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useState} from "react";

import {password_validator} from "../../../validators";
import {authService} from "../../../services";

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
        authService.change_password(token, password).then((response) => {
            navigate('/auth/login')
        }).catch((e) => {
            setMessage(e.response.data)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(change)}>
                {errors.password && <div>{errors.password.message}</div>}
                {message !== '' && <div>{message}</div>}
                <input type="text" id={'first'} placeholder={'new password'} {...register('password')}/>
                <input type="text" id={'second'} placeholder={'repeat the password'} onChange={(e) => matching(e)}/>
                <button disabled={!isValid || message !== ''}>Change password</button>
            </form>
        </div>
    )
}

export {
    RecoveryPasswordPage
};
