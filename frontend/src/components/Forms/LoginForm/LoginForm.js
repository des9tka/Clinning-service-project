import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {auth_service} from "../../../services";
import {userActions} from "../../../redux";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(userActions.setSelf(null))

    const [state, setState] = useState({
        message: null,
        email: null,
        password: null
    })

    const {register, handleSubmit} = useForm({
        mode: 'all',
    })

    const log = async (user) => {
        try {
            auth_service.deleteTokens()
            const {data} = await auth_service.login(user).catch((response) => {
                switch (response.response.data.non_field_errors[0]) {
                    case 'Not exist.':
                        setState((prevState) => ({...prevState, message: 'User with current mail is not exist.'}))
                        break
                    case 'Not active.':
                        setState((prevState) => ({...prevState, message: 'Not active.'}))
                        break
                    case 'Incorrect password.':
                        setState((prevState) => ({...prevState, message: 'Incorrect password.'}))
                        break
                    default:
                        setState((prevState) => ({...prevState, message: 'Invalid mail.'}))
                }
            })
            await auth_service.setTokens(data)
            setState((prevState) => ({...prevState, message: null}))
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const activate = () => {
        auth_service.activation(state.email).then((response) => setState((prevState) => ({
            ...prevState,
            message: response.data
        }))).catch((error) => setState((prevState) => ({...prevState, message: error.response.data})))
    }


    return (
        <form className={'login-form'} onSubmit={handleSubmit(log)}>
            {state.message !== 'Not active.' && <div className={'login-error-div rm'}>{state.message}</div>}
            {state.message === 'Not active.' &&
                <div className={'login-error-div'}>Your account is not active. <br/> Send me <a className={'activate-request-link'} onClick={() => activate()}>activation
                    link</a>.</div>}
            <input type="text" className={'login-email login-items'} placeholder={'email'}  {...register('email')} onChange={(e) => {
                setState((prevState) => ({...prevState, email: e.target.value}))
            }}/>
            <br/>
            <input type="text" className={'login-password login-items'} placeholder={'password'} {...register('password')} onChange={(e) => {
                setState((prevState) => ({...prevState, password: e.target.value}))
            }}/>
            <br/>
            <button className={'login-form-button'} disabled={!state.email || !state.password || state.email === '' || state.password === ''}>Login</button>
        </form>
    )
}

export {
    LoginForm
};
