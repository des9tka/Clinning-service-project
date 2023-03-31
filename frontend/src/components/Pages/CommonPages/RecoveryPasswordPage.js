import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useState} from "react";

import {password_validator} from "../../../validators";
import {authService} from "../../../services";

const RecoveryPasswordPage = () => {

    const {token} = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        message: ' ',
        token: null
    });

    const {handleSubmit, register, formState: {isValid, errors}} = useForm({
        mode: 'all',
        resolver: joiResolver(password_validator)
    });


    const first = document.getElementById('first')

    const matching = (e) => {
        if (first.value !== e.target.value) {
            setState(prevState => ({...prevState, message: 'Passwords arent matching'}))
        } else {
            setState({token: token, message: ''})
        }
    }

    const change = (password) => {
        authService.change_password(state.token, password).then((response) => {
            console.log(response)
        }).catch((e) => {
            console.log(e)
            setState(prevState => ({...prevState, token: e.response.data}))
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(change)}>
                {errors.password && <div>{errors.password.message}</div>}
                {state.message === 'Passwords arent matching' && <div>{state.message}</div>}
                <input type="text" id={'first'} placeholder={'new password'} {...register('password')}/>
                <input type="text" id={'second'} placeholder={'repeat the password'} onChange={(e) => matching(e)}/>
                <button disabled={!isValid || state.message !== ''}>Change password</button>
            </form>
        </div>
    )
}

export {
    RecoveryPasswordPage
};
