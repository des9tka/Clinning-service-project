import {useForm} from "react-hook-form";

import {order_service, user_service} from "../../../services";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const OrderForm = () => {

    const {handleSubmit, register} = useForm();
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const formData = new FormData();

    const addOrder = async (order) => {
        const newOrder = await user_service.newOrder({
            address: order.address,
            task_description: order.task_description,
            date: order.date,
            time: order.time,
            footage: order.footage
        })
        try {
            for (let i = 0; i < files.length; i++) {
                formData.append(`photo${i}`, files[i])
            }
            await order_service.addPhoto(newOrder.data.id, formData)
            navigate('/office')
        } catch (err) {
            order_service.delete(newOrder.data.id)
        }
    }

    const remove = (photo) => {
        setFiles(files.filter(file => file.name !== photo.name))
    }

     const fileUploader = (e) => {
        const file = e.target.files
        let same = files.filter(photo => photo.name === file[0].name)
        if (files.length < 10) {
            if (same.length === 0) {
                setFiles(prevState => [...prevState, file[0]])
            } else {
                alert('This photo already added!!!')
                same = []
            }
        } else {
            alert('Allow to upload 10 photos')
        }
    }

    return (
        <form onSubmit={handleSubmit(addOrder)} className={'order-form'}>
            <input type="text" placeholder={'Address'} {...register('address')}/>
            <input type="text" placeholder={'Date (YYYY-MM-DD)'}  {...register('date')}/>
            <input type="text" placeholder={'Time (HH:MM)'}  {...register('time')}/>
            <input type="text" placeholder={'Footage'}  {...register('footage')}/>
            <input type="text" placeholder={'Task description'} className={'task-field'}  {...register('task_description')}/>
            <input type="file" className={'order-fileInput'} multiple onChange={(e) => fileUploader(e)}/>

            <div className={'files-div'}>
                {files && files.map((file, index) => <div>
                    {`file ${index + 1}`} - {file.name.slice(0, 10)}... <button onClick={() => remove(file)}>remove</button>
                </div>)}
            </div>

            <button className={'order-form-button'}>Save</button>

        </form>
    )
}
export {
    OrderForm
};
