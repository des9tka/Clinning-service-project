import {useForm} from "react-hook-form";

import {order_service, user_service} from "../../../services";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const OrderForm = () => {

    const {handleSubmit, register} = useForm();
    const [files, setFiles] = useState([]);
    const [text, setText] = useState('0');
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
    useEffect(() => {
        const select = document.querySelector('select');
        const startTime = '09:00';
        const endTime = '20:00';

        let currentTime = startTime;
        while (currentTime <= endTime) {
            const option = document.createElement('option');
            option.text = currentTime;
            option.value = currentTime;
            select.appendChild(option);

            const [hours, minutes] = currentTime.split(':');
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setMinutes(date.getMinutes() + 5);
            currentTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        }
    }, [])


    return (
        <form onSubmit={handleSubmit(addOrder)} className={'order-form'}>
            <input type="text" placeholder={'Address'} {...register('address')}/>
            <input type="date" placeholder={'Date (YYYY-MM-DD)'}  {...register('date')}/>
            <select {...register('time')} className={'order-select'}></select>

            <input type="text" placeholder={'Footage'}  {...register('footage')}/>
            <label>{text}/300</label>
            <input type="text" placeholder={'Task description'} className={'task-field'} maxLength='300' onInput={(e) => {
                setText(e.target.value.length)
            }} {...register('task_description')}/>
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
