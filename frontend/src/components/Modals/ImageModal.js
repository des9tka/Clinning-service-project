const ImageModal = ({url, setIsActive}) => {

    return (
        <div className={'modal-img'}>
            <button onClick={() => {
                return setIsActive(false)
            }}>X</button>
            <img src={url} alt={'order_photo'}/>
        </div>
    )
}


export {
    ImageModal
};
