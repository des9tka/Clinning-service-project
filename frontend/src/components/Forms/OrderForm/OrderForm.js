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

    const fileUploader = (e) => {
        const file = e.target.files
        setFiles(prevState => [...prevState, file[0]])
    }

    return (
        <form onSubmit={handleSubmit(addOrder)}>
            <input type="text" placeholder={'address'} {...register('address')}/>
            <input type="text" placeholder={'date (YYYY-MM-DD)'}  {...register('date')}/>
            <input type="text" placeholder={'time (HH:MM)'}  {...register('time')}/>
            <input type="text" placeholder={'footage'}  {...register('footage')}/>
            <input type="text" placeholder={'task_description'}  {...register('task_description')}/>
            <input type="file" multiple onChange={(e) => fileUploader(e)}/>

            <button>Save</button>
        </form>
    )
}
export {OrderForm};
