const UserOrdersFiles = ({file, func: remove, index}) => {

    return (
        <div>
            <div className={'files-div'}>
                {`file ${index + 1}`} - {file.name.slice(0, 10)}... <button type={"button"} onClick={() => remove(file)}>remove</button>
            </div>
        </div>
    )
}
export {
    UserOrdersFiles
};
