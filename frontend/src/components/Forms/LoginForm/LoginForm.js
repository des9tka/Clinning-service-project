import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {auth_service, user_service} from "../../../services";
import {userActions} from "../../../redux";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.setSelf(null));
    }, [])

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
            await auth_service.deleteTokens()
            const {data} = await auth_service.login(user)
            await auth_service.setTokens(data)
            user_service.getPerm().then((response) => {
                switch (response.data) {
                    case 'user':
                        navigate('/')
                        break;
                    case 'employee':
                        navigate('/employee/home')
                        break;
                    case 'admin':
                        navigate('/admin/home')
                        break;
                    case 'superuser':
                        navigate('/superuser/home')
                        break;
                }
            })
        } catch (e) {
            switch (e.response.data.non_field_errors[0]) {
                case 'User does not exist.':
                    setState((prevState) => ({...prevState, message: 'Incorrect email or password.'}))
                    break
                case 'Not active.':
                    setState((prevState) => ({...prevState, message: 'Not active.'}))
                    break
                case 'Incorrect email or password.':
                    setState((prevState) => ({...prevState, message: 'Incorrect email or password.'}))
                    break
                default:
                    setState((prevState) => ({...prevState, message: 'Something went wrong, wait a few seconds and try again.'}))
            }
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
            <label htmlFor={'login-email'}>Email</label>
            <input type="text" className={'login-email login-items'} {...register('email')} onChange={(e) => {
                setState((prevState) => ({...prevState, email: e.target.value}))
            }}/>
            <br/>
            <label htmlFor={'login-password'}>Password</label>
            <input type="text" className={'login-password login-items'} {...register('password')} onChange={(e) => {
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
