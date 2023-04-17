import {useEffect} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";

import {user_service} from "../../../services";
import {profile_validator} from "../../../validators";
import {BASE_URL} from "../../../configs";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../redux";
import {LoadingPage} from "../../Pages";

const ProfileForm = () => {

    const formData = new FormData();
    const dispatch = useDispatch();
    const {self} = useSelector(state => state.userReducer)

    const {setValue, register, handleSubmit, formState: {isValid, errors}} = useForm({
        resolver: joiResolver(profile_validator),
        mode: 'all'
    })

    useEffect(() => {
        dispatch(userActions.setSelfUser()).then((value) => {
            const profile = value.payload.data.profile
            setValue('name', `${profile.name}`);
            setValue('surname', `${profile.surname}`);
            setValue('age', `${profile.age}`);
            setValue('phone', `${profile.phone}`);
        })
    }, [])

    const profileUpdate = async (profile) => {

        const avatar = document.getElementById('avatar').files
        formData.append('user_photo', avatar[0])

        await user_service.profileUpdate(profile)


        user_service.addPhoto(formData)
            .then(() => {
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (!self) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    return (
        <form className={'profile-form'} onSubmit={handleSubmit(profileUpdate)} encType="multipart/form-data">
            <input type="text" placeholder={'name'} {...register('name')} />
            <input type="text" placeholder={'surname'} {...register('surname')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'phone'} {...register('phone')}/>

            {self.profile.user_photo && <img className={'profile-img'} src={`${BASE_URL}/${self.profile.user_photo}`} alt="photo"/>}
            <input type="file" id={'avatar'} className={'avatar-input'}/>

            <button className={'profile-form-button'} disabled={!isValid}>Save</button>

            <div className={'errors'}>
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