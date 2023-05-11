import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";

import {c_service_service} from "../../../services";
import {service_validator} from "../../../validators";
import {serviceActions} from "../../../redux";
import {SuperUserServiceFiles} from "../../Pages/SuperUserPages/SuperUserServiceFiles";

const ServiceForm = () => {

    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {isValid, errors, }, setError, reset} = useForm({
        mode: 'all',
        resolver: joiResolver(service_validator)
    });

    const serviceConfirm = async (data) => {
        let service;
        if (!files[0]) {
            alert('Can`t create a service without service img`s!')
        } else {
            try {
                service = await c_service_service.create(data)
                c_service_service.add_photos(service.data.id, files)
                dispatch(serviceActions.addService(service.data))
                reset()
                setFiles([])
            } catch (e) {
                if (service?.data?.id) {
                    c_service_service.delete(service?.data.id)
                }
                for (let err in e.response.data) {
                    switch (String(err)){
                        case 'address':
                            setError('address', {
                                message: 'Service with exact address is already exist!'
                            })
                            break;
                        case 'name':
                            setError('name', {
                                message: 'Service with exact name is already exist!'
                            })
                    }
                }
            }
        }
    }

    const fileUploader = (e) => {
        const file = e.target.files
        let same = files.filter(photo => photo.name === file[0].name)
        if (files.length < 5) {
            if (same.length === 0) {
                setFiles(prevState => [...prevState, file[0]])
            } else {
                alert('This photo already added!!!')
                same = []
            }
        } else {
            alert('Allow to upload 5 photos')
        }
    }

    const remove = (photo) => {
        setFiles(files.filter(file => file.name !== photo.name))
    }

    return (
        <div>
            <form className={'service-form'} onSubmit={handleSubmit(serviceConfirm)} encType="multipart/form-data">

                <label>Service Name</label>
                <input type="text" {...register('name', {required: true, minLength: 2, maxLength: 30})}/>

                <label>Service Address</label>
                <input type="text" {...register('address', {required: true, minLength: 2, maxLength: 50})}/>

                <label>Service City</label>
                <input type="text" {...register('city', {required: true, minLength: 2, maxLength: 30})}/>

                <input id={'input-file'} className={'hide'} type="file" multiple onChange={(e) => fileUploader(e)}/>

                <div className={'upload-photo-div'} onClick={() => {
                    document.getElementById('input-file').click()
                }}>Upload photo</div>

                <div className={'photo-preview-div'}>
                    {files && files.map((file, index) => <SuperUserServiceFiles func={remove} file={file} index={index}/>)}
                </div>

                <button type={'submit'} disabled={!isValid && !files[0]}>Create</button>

                <div className={'service-errors-div'}>
                    <div className={'errors'}>
                        {errors.name && <div>{errors.name.message}</div>}
                        {errors.address && <div>{errors.address.message}</div>}
                        {errors.city && <div>{errors.city.message}</div>}
                    </div>
                </div>
            </form>
        </div>
    )
}


export {
    ServiceForm
};
