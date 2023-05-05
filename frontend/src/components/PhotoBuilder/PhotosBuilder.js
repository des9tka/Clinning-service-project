import {useState} from "react";

import {ImageModal} from "../Modals";
import {BASE_URL} from "../../configs";


const PhotosBuilder = ({photo}) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <img onClick={() => setIsActive(true)} className={'order-img'} src={`${BASE_URL}/${photo}`} alt="order_photo"/>
            {isActive && <ImageModal setIsActive={setIsActive} url={`${BASE_URL}/${photo}`}/>}
        </div>
    )
}

export {
    PhotosBuilder
};
