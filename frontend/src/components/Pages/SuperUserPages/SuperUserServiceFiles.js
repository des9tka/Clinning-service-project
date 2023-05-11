const SuperUserServiceFiles = ({index, func: remove, file}) => {

    return (
        <div>
            <div className={'files-div'}>
                {`file ${index + 1}`} - {file.name.slice(0, 10)}... <button type={'button'} onClick={() => remove(file)}>remove</button>
            </div>
        </div>
    )
}
export {
    SuperUserServiceFiles
};
