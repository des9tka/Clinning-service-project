import {useForm} from "react-hook-form";
import {useState} from "react";

import {c_service_service} from "../../../services";

const ServiceForm = () => {

    const [files, setFiles] = useState([]);

    const {register, handleSubmit, formState: {isValid, errors}} = useForm({
        mode: 'all'
    });

    const serviceConfirm = async (data) => {
        const service = await c_service_service.create(data)
        try {
            console.log(files)
            c_service_service.add_photos(service.data.id, files)
        } catch (e) {
            c_service_service.delete(service.data.id)
            console.log(e)
        }
    }

    const fileUploader = (e) => {
        const file = e.target.files
        let same = files.filter(photo => photo.name === file[0].name)
        console.log(same)
        if (same.length === 0) {
            setFiles(prevState => [...prevState, file[0]])
        } else {
            alert('This photo already added!!!')
            same = []
        }
    }

    const remove = (photo) => {
        setFiles(files.filter(file => file.name !== photo.name))
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
                    {files && files.map((file, index) => <div>
                        {`file ${index + 1}`} - <button onClick={() => remove(file)}>remove</button>
                    </div>)}
                </div>

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
