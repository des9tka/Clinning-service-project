import {useForm} from "react-hook-form";

import {joiResolver} from "@hookform/resolvers/joi";
import {user_validator} from "../../validators";
import {authService} from "../../services/auth_service";
import {useState} from "react";

const LoginForm = () => {
    const [error, setError] = useState(null)
    const {register, handleSubmit} = useForm({
        resolver: joiResolver(user_validator),
        mode: 'all'
    })

    const login = (user) => {
        authService.login(user)
            .then(() => {

            })
            .then(function (err) {
                setError('Invalid email or password')
        })
    }
    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>

            {error && <div>{error}</div>}

        </form>

    )
}

export {LoginForm};
