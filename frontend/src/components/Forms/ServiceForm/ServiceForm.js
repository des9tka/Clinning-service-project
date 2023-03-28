import {useForm} from "react-hook-form";

import {c_service_service} from "../../../services";
import {useState} from "react";

const ServiceForm = () => {

    const [files, setFiles] = useState([]);
    const formData = new FormData()

    const {register, handleSubmit, formState: {isValid, errors}} = useForm({
        mode: 'all'
    });

    const serviceConfirm = async (data) => {
        const service = await c_service_service.create(data)
        try {
            c_service_service.add_photos(service.data.id, formData)
        } catch (e) {
            c_service_service.delete(service.data.id)
            console.log(e)
        }
    }

    const fileUploader = (e) => {
        const file = e.target.files
        setFiles(prevState => [...prevState, file[0]])
    }

    return (
        <div>
            <form onSubmit={handleSubmit(serviceConfirm)} encType="multipart/form-data">
                <input type="text" placeholder={'Service name'} {...register('name', {required: true, minLength: 2, maxLength: 30})}/>
                <input type="text" placeholder={'Service address'} {...register('address', {required: true, minLength: 2, maxLength: 50})}/>
                <input type="text" placeholder={'Service city'} {...register('city', {required: true, minLength: 2, maxLength: 30})}/>
                <input type="file" multiple onChange={(e) => fileUploader(e)}/>
                <button disabled={!isValid}>Create</button>

                <div>
                    {errors.name && errors.name.message}
                    {errors.address && errors.address.message}
                    {errors.city && errors.city.message}
                </div>

            </form>
        </div>
    )
}
export {
    ServiceForm
};
