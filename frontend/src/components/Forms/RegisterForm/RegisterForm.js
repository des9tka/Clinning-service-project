import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import {auth_service} from "../../../services";
import {user_validator} from "../../../validators";
import {userActions} from "../../../redux";

const RegisterForm = () => {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        message: null,
        hidden: false
    });
    const {error} = useSelector(state => state.userReducer);

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({
        resolver: joiResolver(user_validator),
        mode: 'all'
    })

    const reg = async (user) => {
        if (!user.phone.startsWith("38") && !user.phone.startsWith("+38")) {
            user.phone = '38' + user.phone
        } else if (user.phone.startsWith("+")) {
            user.phone.substring(1);
        }
        await auth_service.register({
            email: user.email,
            password: user.password,
            profile: {
                name: user.name,
                surname: user.surname,
                age: user.age,
                phone: user.phone
            }
        })
            .then(() => {
                setState(prevState => ({...prevState, message: 'Activate you account in your mail.'}))
                dispatch(userActions.setError(null))
                reset()
            })
            .catch((e) => {
                if (e.response.data.email[0] === 'user model with this email already exists.') {
                    dispatch(userActions.setError('User with current email is Exist!'))
                } else if (!error) {
                    dispatch(userActions.setError('Something gonna wrong, please, try again!'))
                }
                reset()
            });
    }

    function togglePassword() {
        const passwordInput = document.getElementById("password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setState(prevState => ({...prevState, hidden: true}))
        } else {
            passwordInput.type = "password";
            setState(prevState => ({...prevState, hidden: false}))
        }
    }

    return (
        <form className={'register-form'} onSubmit={handleSubmit(reg)} onChange={() => dispatch(userActions.setError(null))}>
            {state.message && <h3 className={'about-text'}>{state.message}</h3>}
            <label>Email</label>
            <input type="text" {...register('email')}/>

            <label>Password</label>
            <div className="password-container">
                <input id={'password'} type="password" {...register('password')}/>
                <span className="password-toggle" onClick={() => togglePassword()}>
                    <FontAwesomeIcon icon={state.hidden ? faEyeSlash : faEye}/>
                </span>
            </div>
            <label>Name</label>
            <input type="text" {...register('name')}/>
            <label>Surname</label>
            <input type="text" {...register('surname')}/>
            <label>Age</label>
            <input type="number" {...register('age')}/>
            <label>Phone</label>
            <input type="number" {...register('phone')}/><br/>
            <button className={'register-form-button'} disabled={!isValid}>Register</button>

            <div className={'register-error-div'}>
                {errors.email && <div>✖ Email: {errors.email.message}</div>}
                {errors.password && <div>✖ Password: {errors.password.message}</div>}
                {errors.name && <div>✖ Name: {errors.name.message}</div>}
                {errors.surname && <div>✖ Surname: {errors.surname.message}</div>}
                {errors.age && <div>✖ Age: {errors.age.message}</div>}
                {errors.phone && <div>✖ Phone: {errors.phone.message}</div>}
                {error && <div>✖ {error}</div>}
            </div>
        </form>
    )
}


export {
    RegisterForm
};
