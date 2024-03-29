import {useEffect, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {user_service} from "../../../services";
import {profile_validator} from "../../../validators";
import {BASE_URL} from "../../../configs";
import {ErrorPage, LoadingPage} from "../../Pages";
import {userActions} from "../../../redux";

const ProfileForm = () => {

    const formData = new FormData();
    const dispatch = useDispatch();
    const {self} = useSelector(state => state.userReducer);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const {setValue, register, handleSubmit, formState: {isValid, errors}} = useForm({
        resolver: joiResolver(profile_validator),
        mode: 'all'
    })

    useEffect(() => {
        dispatch(userActions.setSelfUser()).then((data) => {
            setValue('name', `${data.payload.data.profile.name}`, {shouldValidate: true});
            setValue('surname', `${data.payload.data.profile.surname}`, {shouldValidate: true});
            setValue('age', `${data.payload.data.profile.age}`, {shouldValidate: true});
            setValue('phone', `${data.payload.data.profile.phone}`, {shouldValidate: true});
        })
    }, [])

    const profileUpdate = async (profile) => {

        const avatar = document.getElementById('avatar-input').files
        if (avatar[0]) {
            formData.append('user_photo', avatar[0])
        }

        await user_service.profileUpdate(profile);

        user_service.addPhoto(formData)
            .catch((e) => {
                return <ErrorPage error={e.response.data}/>
            })
    }

    if (!self) {
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    }

    if (previewAvatar) {
        document.getElementById('avatar-preview').addEventListener('click', () => {
            document.getElementById('avatar-input').click();
        })
    }

    return (
        <form className={'profile-form'} onSubmit={handleSubmit(profileUpdate)} encType="multipart/form-data">
            <label>Name</label>
            <input type="text" {...register('name')} />
            <label>Surname</label>
            <input type="text" {...register('surname')}/>
            <label>Age</label>
            <input type="number" {...register('age')}/>
            <label>Phone</label>
            <input type="text" {...register('phone')}/>

            <input type="file" id={'avatar-input'} className={'avatar-input'} onChange={(e) => {
                let avatarPreview = null;
                if (!previewAvatar) {
                    avatarPreview = document.createElement('img');
                } else {
                    avatarPreview = document.getElementById('avatar-preview');
                }
                const avatarWrap = document.getElementById('img-wrap');

                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    avatarPreview.src = reader.result;
                }

                avatarPreview.className = 'avatar-img';
                avatarPreview.id = 'avatar-preview';
                avatarWrap.appendChild(avatarPreview);
                setPreviewAvatar(e.target.value);
            }
            }/>

            <div id={'img-wrap'} className={'img-wrap'}>

                {!previewAvatar && self?.profile?.user_photo && <img className={'avatar-img'} src={`${BASE_URL}${self.profile.user_photo}`} onClick={() => {
                    document.getElementById('avatar-input').click();
                }} alt="photo"/>}

                {!previewAvatar && !self?.profile?.user_photo && <div onClick={() => {
                    document.getElementById('avatar-input').click();
                }} className={'empty-avatar'} id={'empty-avatar'}></div>}

            </div>

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