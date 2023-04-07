import {BASE_URL} from "../../configs";

const EmployeePhotoBuilder = ({photo}) => {

    let photoLink = ''

    if (photo) {
        photoLink = photo.replace(/^http:\/\/localhost/, `${BASE_URL}`);
    }

    return (
        <div>
            {photo && <img className={'img'} src={`${photoLink}`} alt="user_photo"/>}
        </div>
    )
}
export {
    EmployeePhotoBuilder
};
