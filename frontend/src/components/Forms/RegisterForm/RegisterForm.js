import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {auth_service} from "../../../services";
import {user_validator} from "../../../validators";
import {userActions} from "../../../redux";

const RegisterForm = () => {

    const {error} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState(null);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: joiResolver(user_validator),
        mode: 'all'
    })

    const reg = async (user) => {
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
            setState('Activate you account in your mail.')
            dispatch(userActions.setError(null))
        })
            .catch(() => {
                if (!error) {
                    dispatch(userActions.setError('User with current email Exist!'))
                }
            });
    }


    return (
        <form className={'register-form'} onSubmit={handleSubmit(reg)}>
            {state && <h3>{state}</h3>}
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'surname'} {...register('surname')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'phone'} {...register('phone')}/><br/>
            <button className={'register-form-button'} disabled={!isValid}>Register</button>

            <div className={'register-error-div'}>
                {errors.email && <div>Email: {errors.email.message}</div>}
                {errors.password && <div>Password: {errors.password.message}</div>}
                {errors.name && <div>Name: {errors.name.message}</div>}
                {errors.surname && <div>Surname: {errors.surname.message}</div>}
                {errors.age && <div>Age: {errors.age.message}</div>}
                {errors.phone && <div>Phone: {errors.phone.message}</div>}
                {error && <div>Errors: {error}</div>}
            </div>

        </form>
    )
}

export {
    RegisterForm
};
