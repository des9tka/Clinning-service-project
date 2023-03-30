import {BASE_URL} from "../../configs";

const PhotosBuilder = ({photo}) => {

    return (
        <div>
            <img className={'img'} src={`${BASE_URL}/${photo}`} alt="order_photo"/>
        </div>
    )
}

export {PhotosBuilder};
