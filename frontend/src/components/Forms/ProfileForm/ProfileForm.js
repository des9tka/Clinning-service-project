import {useEffect} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";

import {user_service} from "../../../services";
import {profile_validator} from "../../../validators";

const ProfileForm = () => {

    const {setValue, register, handleSubmit, formState: {isValid, errors}} = useForm({
        resolver: joiResolver(profile_validator),
        mode: 'all'
    })

    useEffect(() => {
        user_service.getSelf().then(value => {
            setValue('name', `${value.data.profile.name}`);
            setValue('surname', `${value.data.profile.surname}`);
            setValue('age', `${value.data.profile.age}`);
            setValue('phone', `${value.data.profile.phone}`);
        })
    }, [])

    const profileUpdate = async (profile) => {
        await user_service.profileUpdate(profile)


        const avatar = document.getElementById('avatar').files

        user_service.addPhoto(avatar)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <form onSubmit={handleSubmit(profileUpdate)}>
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'surname'} {...register('surname')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'phone'} {...register('phone')}/>
            <input type="file" id={'avatar'}/>
            <button disabled={!isValid}>Save</button>

            <div>
                {errors.name && <div>{errors.name.message}</div>}
                {errors.surname && <div>{errors.surname.message}</div>}
                {errors.age && <div>{errors.age.message}</div>}
                {errors.phone && <div>{errors.phone.message}</div>}
            </div>
        </form>
    )
}
export {
    ProfileForm
};