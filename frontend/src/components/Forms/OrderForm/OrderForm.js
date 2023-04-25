import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {order_service, user_service} from "../../../services";

const OrderForm = () => {

    const {handleSubmit, register} = useForm();
    const [state, setState] = useState({
        files: [],
        text: '0',
        message: null
    });
    const navigate = useNavigate();
    const formData = new FormData();

    const addOrder = async (order) => {
        const newOrder = await user_service.newOrder({
            address: order.address,
            task_description: order.task_description,
            date: order.date,
            time: order.time,
            footage: order.footage
        }).catch((e) => {
            if ('address' || 'time' || 'date' || 'footage' || 'task_description' in e.response.data) {
                setState(prevState => ({...prevState, message: 'Some forms is empty. Full it and try again!'}))
            }
        })
        try {
            if (newOrder) {
                for (let i = 0; i < state.files.length; i++) {
                    formData.append(`photo${i}`, state.files[i])
                }
                await order_service.addPhoto(newOrder.data.id, formData)
                navigate('/office')
            }
        } catch (err) {
            order_service.delete(newOrder.data.id)
            setState(prevState => ({...prevState, message: 'Somethings went wrong, try again!'}))
        }
    }

    const remove = (photo) => {
        setState(prevState => ({...prevState, files: state.files.filter(file => file.name !== photo.name)}))
    }

    const fileUploader = (e) => {
        const file = e.target.files
        let same = state.files.filter(photo => photo.name === file[0].name)
        if (state.files.length < 10) {
            if (same.length === 0) {
                setState(prevState => ({...prevState, files: [...state.files, file[0]]}))
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

    const change = (e) => {
        const time = document.getElementById('time')
        time.removeChild(time.firstChild);
    };

    return (
        <form onSubmit={handleSubmit(addOrder)} className={'order-form'}>

            {state.message && <label className={'errors'}>{state.message}</label>}

            <input id={'address'} type="text" placeholder={'Address'} {...register('address')}/>
            <input id={'date'} type="date"  {...register('date')}/>

            <select id={'time'} {...register('time')} className={'order-select'} onChange={(e) => change(e)}>
                <option disabled selected value={'0'}>00:00</option>
            </select>

            <input id={'footage'} type="text" placeholder={'Footage'}  {...register('footage')}/>

            <label>{state.text}/300</label>
            <input id={'task'} type="text" placeholder={'Task description'} className={'task-field'} maxLength='300' onInput={(e) => {
                setState(prevState => ({...prevState, text: e.target.value.length}))
            }} {...register('task_description')}/>

            <input id={'files'} type="file" className={'order-fileInput'} multiple onChange={(e) => fileUploader(e)}/>
            <div className={'files-div'}>
                {state.files && state.files.map((file, index) => <div>
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
