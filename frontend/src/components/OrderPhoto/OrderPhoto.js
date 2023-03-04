import {BASE_URL} from "../../configs";

const OrderPhoto = ({photo}) => {

    return (
        <div>
            <img className={'order_img'} src={`${BASE_URL}/${photo}`} alt="order_photo"/>
        </div>
    )
}

export {OrderPhoto};
