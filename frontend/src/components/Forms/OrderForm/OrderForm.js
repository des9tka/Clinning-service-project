import {useForm} from "react-hook-form";

import {order_service, user_service} from "../../../services";

const OrderForm = () => {
    const {handleSubmit, register} = useForm();

    const addOrder = async (order) => {
        const newOrder = await user_service.newOrder({
            address: order.address,
            task_description: order.task_description,
            date: order.date,
            time: order.time,
            footage: order.footage
        })
        try {
            await order_service.addPhoto(newOrder.data.id, order.photos)
            window.location.reload()
        } catch (err) {
            order_service.delete(newOrder.data.id)
        }
    }

    return (
        <form onSubmit={handleSubmit(addOrder)}>
            <input type="text" placeholder={'address'} {...register('address')}/>
            <input type="file" placeholder={'photo'}  {...register('photos')}/>
            <input type="text" placeholder={'date (YYYY-MM-DD)'}  {...register('date')}/>
            <input type="text" placeholder={'time (HH:MM)'}  {...register('time')}/>
            <input type="text" placeholder={'footage'}  {...register('footage')}/>
            <input type="text" placeholder={'task_description'}  {...register('task_description')}/>

            <button>Save</button>
        </form>
    )
}
export {OrderForm};
