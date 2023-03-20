import {useForm} from "react-hook-form";

import {authService, user_service} from "../../../services";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const {register, handleSubmit} = useForm({
        mode: 'all'
    })

    const log = async (user) => {
        try {
            authService.deleteTokens()
            const {data} = await authService.login(user)
            await authService.setTokens(data)
            setError(null)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError('Invalid email or password')
        }
    }

    return (
        <form onSubmit={handleSubmit(log)}>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>

            {error && <div>{error}</div>}
        </form>

    )
}

export {LoginForm};
