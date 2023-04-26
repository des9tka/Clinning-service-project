import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {auth_service} from "../../../services";
import {user_validator} from "../../../validators";
import {userActions} from "../../../redux";

const RegisterForm = () => {

    const dispatch = useDispatch();
    const [state, setState] = useState(null);
    const {error} = useSelector(state => state.userReducer);

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
            .catch((e) => {
                if (!error) {
                    dispatch(userActions.setError('User with current email Exist!'))
                }
            });
    }


    return (
        <form className={'register-form'} onSubmit={handleSubmit(reg)}>
            {state && <h3>{state}</h3>}
            <label>Email</label>
            <input type="text" {...register('email')}/>
            <label>Password</label>
            <input type="text" {...register('password')}/>
            <label>Name</label>
            <input type="text" {...register('name')}/>
            <label>Surname</label>
            <input type="text" {...register('surname')}/>
            <label>Age</label>
            <input type="number" {...register('age')}/>
            <label>Phone</label>
            <input type="text" {...register('phone')}/><br/>
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
