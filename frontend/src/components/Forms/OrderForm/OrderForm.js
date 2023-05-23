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
    const current = new Date();
    const currentDate = new Date().toISOString().slice(0, 10);
    const nextYear = current.setFullYear(current.getFullYear() + 1);

    const currentTimePlus3Hours = new Date(current.getTime() + 3 * 60 * 60 * 1000).toLocaleTimeString('uk-UA', {
        timeZone: 'Europe/Kiev',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    const {handleSubmit, register, setError, formState: {isValid, errors}, setValue, trigger} = useForm({
        mode: 'all',
        resolver: joiResolver(order_validator)
    });
    const [state, setState] = useState({
        files: [],
        text: '0',
        message: ''
    });

    const dateFuncInst = () => {
        //     const select = document.querySelector('select');
        //     const currentHour = new Date().getHours();
        //     let currentMinute = Math.ceil(new Date().getMinutes() / 10) * 10;
        //     const startTime = currentHour >= 9 && document.getElementById('date').value === currentDate ? (currentHour + 3).toString().padStart(2, '0') + `:${currentMinute.toString().padStart(2, '0')}` : '09:00';
        //     const endTime = '20:00';
        //
        //     let currentTime = startTime;
        //     while (currentTime <= endTime) {
        //         const option = document.createElement('option');
        //         option.text = currentTime;
        //         option.value = currentTime;
        //         select.appendChild(option);
        //
        //         const [hours, minutes] = currentTime.split(':');
        //         const date = new Date();
        //         date.setHours(hours);
        //         date.setMinutes(minutes);
        //         date.setMinutes(date.getMinutes() + 5);
        //         currentTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        //     }
        //     setValue('time', startTime, {shouldValidate: true});
        // }

        const select = document.querySelector('select');
        let currentHour = new Date().getHours();
        let currentMinute = Math.ceil(new Date().getMinutes() / 10) * 10;

        // Adjust currentMinute if it exceeds 59
        if (currentMinute > 59) {
            currentMinute = 0;
            currentHour += 1;
        }

        const startTime =
            currentHour >= 9 && document.getElementById('date').value === currentDate
                ? `${String(currentHour + 3).padStart(2, '0')}:${String(
                    currentMinute
                ).padStart(2, '0')}`
                : '09:00';
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
        setValue('time', startTime, {shouldValidate: true});
    };

    useEffect(() => {
        setValue('date', currentDate, {shouldValidate: true});
        dateFuncInst()
    }, [])

    const addOrder = async (order) => {
        const selectedDate = document.getElementById('date').value;
        if (selectedDate === currentDate && document.getElementById('time').value < currentTimePlus3Hours) {
            setError('time', {
                message: 'Chosen time is to late! Must be no later than the time now with a margin of three hours!'
            })
        } else {
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
        const selectedDate = document.getElementById('date').value;

        if (currentDate === selectedDate && e.target.value < currentTimePlus3Hours) {
            setError('time', {
                message: 'Time is too late! It must not be later than the current time with a margin of three hours!',
            });
        } else {
            setError('time', {
                message: null,
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(addOrder)} className={'order-form'}>

            {state.message && state.message !== '' && <label className={'errors'}>{state.message}</label>}

            <label id={'address-label'}>{errors.address ? <div className={'errors'}>✖ {errors.address.message}</div> : 'Address'}</label>
            <input id={'address'} type="text" {...register('address')}/>

            <label id={'date-label'}>{errors.date ? <div className={'errors'}>✖ {errors.date.message}</div> : 'Date'}</label>
            <input id={'date'} type="date" {...register('date')} onChange={() => dateFuncInst()} min={currentDate} max={nextYear}/>

            <label id={'time-label'}>{errors.time ? <div className={'errors'}>✖ {errors.time.message}</div> : 'Time'}</label>
            <select id={'time'} {...register('time')} className={'order-select'} onChange={(e) => timeCheck(e)}></select>

            <label id={'footage-label'}>{errors.footage ? <div className={'errors'}>✖ {errors.footage.message}</div> : 'Footage'}</label>
            <input id={'footage'} type="number" {...register('footage')}/>

            <label id={'task-label'}>{errors.task_description ?
                <div className={'errors'}>✖ {errors.task_description.message}</div> : 'Task description'}</label>
            <label>{state.text}/300</label>
            <input id={'task'} type="text" className={'task-field'} maxLength='300' onInput={(e) => {
                setState(prevState => ({...prevState, text: e.target.value.length}))
            }} {...register('task_description')}/>

            <label id={'files-label'}>{!state.files[0] ? <div className={'errors'}>✖ You should choose some img`s for order!</div> : 'Select files'}</label>
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
