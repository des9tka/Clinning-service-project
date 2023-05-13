import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {order_service, user_service} from "../../../services";
import {UserOrdersFiles} from "../../Pages/UserPages/UserOrdersFiles";
import {order_validator} from "../../../validators/order_validator";

const OrderForm = () => {

    const navigate = useNavigate();
    const formData = new FormData();

    const {handleSubmit, register, setError, formState: {isValid, errors}, setValue, trigger} = useForm({
        mode: 'all',
        resolver: joiResolver(order_validator)
    });
    const [state, setState] = useState({
        files: [],
        text: '0',
        message: ''
    });

    useEffect(() => {
        const date = new Date().toISOString().slice(0, 10);
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
        trigger(['address', 'date', 'time', 'footage', 'task_description']);
        setValue('time', '09:00', {shouldValidate: true})
        setValue('date', date, {shouldValidate: true})
    }, [])

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

    const timeCheck = (e) => {
        const currentTime = new Date().getTime();
        const currentTimePlus3Hours = new Date(currentTime + 3 * 60 * 60 * 1000).toLocaleTimeString('uk-UA', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });

        const timestamp = Date.now();
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const currentDate = `${year}-${month < 10 ? '0' + month : month}-${day}`;

        const selectedDate = document.getElementById('date').value
        if (currentDate === selectedDate && e.target.value < currentTimePlus3Hours) {
            setError('time', {
                message: 'is to late! Must be no later than the time now with a margin of three hours!'
            })
        } else {
            setError('time', {
                message: null
            })
        }
    };

    const dateValidCheck = (e) => {
        // console.log(e.target.value)
        console.log(1)
    }

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
                ) : deErrorEcre('address-label')}</label>
            <input id={'address'} type="text" placeholder={'Address'} {...register('address')}/>

            <label id={'date-label'}>Date {errors.date ? (
                    <>
                        <span>{errors.date.message}</span>
                        {errorEcre('date-label')}
                    </>
                ) : deErrorEcre('date-label')}</label>
            <input id={'date'} type="date" onChange={(e) => dateValidCheck(e)} {...register('date')}/>

            <label id={'time-label'}>Time {errors.time ? (
                    <>
                        <span>{errors.time.message}</span>
                        {errorEcre('time-label')}
                    </>
                ) : deErrorEcre('time-label')}</label>
            <select id={'time'} {...register('time')} defaultValue={null} className={'order-select'} onChange={(e) => timeCheck(e)}></select>

            <label id={'footage-label'}>Footage {errors.footage ? (
                    <>
                        <span>{errors.footage.message}</span>
                        {errorEcre('footage-label')}
                    </>
                ) : deErrorEcre('footage-label')}</label>
            <input id={'footage'} type="number" onClick={(e) => dateValidCheck(e)} {...register('footage')}/>

            <label id={'task-label'}>Task description {errors.task_description ? (
                    <>
                        <span>{errors.task_description.message}</span>
                        {errorEcre('task-label')}
                    </>
                ) : deErrorEcre('task-label')}</label>
            <label>{state.text}/300</label>
            <input id={'task'} type="text" className={'task-field'} maxLength='300' onInput={(e) => {
                setState(prevState => ({...prevState, text: e.target.value.length}))
            }} {...register('task_description')}/>

            <label id={'files-label'}>Select files {state.files[0] ? deErrorEcre('files-label') : errorEcre('files-label')}</label>
            <input id={'files'} type="file" className={'order-fileInput'} multiple onChange={(e) => fileUploader(e)}/>
            <div className={'files-div'}>
                {state.files && state.files.map((file, index) => <UserOrdersFiles file={file} index={index} func={remove}/>)}
            </div>

            <button type={'submit'} disabled={!isValid || !state.files[0]} className={'order-form-button'}>Save</button>

        </form>
    )
}

export {
    OrderForm
};
