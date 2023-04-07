import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {auth_service} from "../../../services";

const LoginForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const {register, handleSubmit} = useForm({
        mode: 'all'
    })

    const log = async (user) => {
        try {
            auth_service.deleteTokens()
            const {data} = await auth_service.login(user)
            await auth_service.setTokens(data)
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
