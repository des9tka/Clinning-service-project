import {BASE_URL} from "../../configs";


const PhotosBuilder = ({photo}) => {

    return (
        <div>
            <img onClick={() =>  window.open(`${BASE_URL}/${photo}`, '_blank')} className={'order-img'} src={`${BASE_URL}/${photo}`} alt="order_photo"/>
        </div>
    )
}

export {
    PhotosBuilder
};
