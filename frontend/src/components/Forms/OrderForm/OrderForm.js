import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {order_service, user_service} from "../../../services";
import {UserOrdersFiles} from "../../Pages/UserPages/UserOrdersFiles";
import {joiResolver} from "@hookform/resolvers/joi";
import {order_validator} from "../../../validators/order_validator";

const OrderForm = () => {

    const {handleSubmit, register, setError, formState: {isValid, errors}} = useForm({
        mode: 'all',
        resolver: joiResolver(order_validator)
    });
    const [state, setState] = useState({
        files: [],
        text: '0',
        message: ''
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
            for (let key in e.response.data) {
                switch (String(key)) {
                    case 'address':
                        setError('address', {
                            message: e.response.data[key]
                        })
                        break;
                    case 'date':
                        setError('date', {
                            message: e.response.data[key]
                        })
                        break;
                    case 'footage':
                        setError('footage', {
                            message: e.response.data[key]
                        })
                        break;
                    case 'task_description':
                        setError('task_description', {
                            message: e.response.data[key]
                        })
                        break;
                    case 'time':
                        setError('time', {
                            message: e.response.data[key]
                        })
                        break;
                }

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

    const errorEcre = (name) => {
        const element = document.getElementById(`${name}`)
        if (element) {
            element.classList.add('errors');
        }
    }
    const deErrorEcre = (name) => {
        const element = document.getElementById(`${name}`)
        if (element) {
            element.classList.remove('errors');
        }
    }

    return (
        <form onSubmit={handleSubmit(addOrder)} className={'order-form'}>

            {state.message && state.message !== '' && <label className={'errors'}>{state.message}</label>}

            <label id={'address-label'}>Address {errors.address ? (
                    <>
                        <span>{errors.address.message}</span>
                        {errorEcre('address-label')}
                    </>
                )
                : deErrorEcre('address-label')}</label>
            <input id={'address'} type="text" placeholder={'Address'} {...register('address')}/>

            <label id={'date-label'}>Date {errors.date ? (
                    <>
                        <span>{errors.date.message}</span>
                        {errorEcre('date-label')}
                    </>
                )
                : deErrorEcre('date-label')}</label>
            <input id={'date'} type="date"  {...register('date')}/>

            <label id={'time-label'}>Time {errors.time ? (
                    <>
                        <span>{errors.time.message}</span>
                        {errorEcre('time-label')}
                    </>
                )
                : deErrorEcre('time-label')}</label>
            <select id={'time'} {...register('time')} defaultValue={null} className={'order-select'} onChange={(e) => change(e)}>
                <option disabled selected value={'0'}>00:00</option>
            </select>

            <label id={'footage-label'}>Footage {errors.footage ? (
                <>
                    <span>{errors.footage.message}</span>
                    {errorEcre('footage-label')}
                </>
            )
                : deErrorEcre('footage-label')}</label>
            <input id={'footage'} type="number" {...register('footage')}/>

            <label id={'task-label'}>Task description {errors.task_description ? (
                <>
                    <span>{errors.task_description.message}</span>
                    {errorEcre('task-label')}
                </>
            )
                : deErrorEcre('task-label')}</label>
            <label>{state.text}/300</label>
            <input id={'task'} type="text" className={'task-field'} maxLength='300' onInput={(e) => {
                setState(prevState => ({...prevState, text: e.target.value.length}))
            }} {...register('task_description')}/>

            <label>Select files</label>
            <input id={'files'} type="file" className={'order-fileInput'} multiple onChange={(e) => fileUploader(e)}/>
            <div className={'files-div'}>
                {state.files && state.files.map((file, index) => <UserOrdersFiles file={file} index={index} func={remove}/>)}
            </div>

            <button type={'submit'} disabled={!isValid} className={'order-form-button'}>Save</button>

        </form>
    )
}


export {
    OrderForm
};
