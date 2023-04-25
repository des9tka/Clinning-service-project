import {useForm} from "react-hook-form";
import {useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {c_service_service} from "../../../services";
import {service_validator} from "../../../validators";

const ServiceForm = () => {

    const [files, setFiles] = useState([]);

    const {register, handleSubmit, formState: {isValid, errors}} = useForm({
        mode: 'all',
        resolver: joiResolver(service_validator)
    });

    const serviceConfirm = async (data) => {
        const service = await c_service_service.create(data)
        try {
            c_service_service.add_photos(service.data.id, files).then(() => window.location.reload())
        } catch (e) {
            c_service_service.delete(service.data.id)
            console.log(e)
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
                <input type="text" placeholder={'Service name'} {...register('name', {required: true, minLength: 2, maxLength: 30})}/>
                <input type="text" placeholder={'Service address'} {...register('address', {required: true, minLength: 2, maxLength: 50})}/>
                <input type="text" placeholder={'Service city'} {...register('city', {required: true, minLength: 2, maxLength: 30})}/>

                <input id={'input-file'} className={'hide'} type="file" multiple onChange={(e) => fileUploader(e)}/>

                <div className={'upload-photo-div'} onClick={() => {
                    document.getElementById('input-file').click()
                }
                }>Upload photo</div>

                <div className={'photo-preview-div'}>
                    {files && files.map((file, index) => <div>
                        {`file ${index + 1}`} - <button onClick={() => remove(file)}>remove</button>
                    </div>)}
                </div>

                <button disabled={!isValid}>Create</button>

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
