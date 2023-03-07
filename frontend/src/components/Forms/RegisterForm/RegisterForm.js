import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";

import {authService} from "../../../services";
import {joiResolver} from "@hookform/resolvers/joi";
import {user_validator} from "../../../validators";

const RegisterForm = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: joiResolver(user_validator),
        mode: 'all'
    })

    const reg = async (user) => {
        await authService.register({
            email: user.email,
            password: user.password,
            profile: {
                name: user.name,
                surname: user.surname,
                age: user.age,
                phone: user.phone
            }
        }).then(() => {
                navigate('/auth/login')
            })
            .catch(function (err) {
                console.log(err);
                if (!error) {
                    setError('User with this email already exist')
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(reg)}>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'surname'} {...register('surname')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'phone'} {...register('phone')}/>
            <button disabled={!isValid}>Register</button>

            <div>
                {errors.email && <div>{errors.email.message}</div>}
                {errors.password && <div>{errors.password.message}</div>}
                {errors.name && <div>{errors.name.message}</div>}
                {errors.surname && <div>{errors.surname.message}</div>}
                {errors.age && <div>{errors.age.message}</div>}
                {errors.phone && <div>{errors.phone.message}</div>}
                {error && <div>{error}</div>}
            </div>
        </form>
    )
}
export {RegisterForm};
