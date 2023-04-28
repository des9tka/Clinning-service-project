const Toggle = () => {

    const setDarkTheme = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    }
    const setLightTheme = () => {
        document.querySelector('body').setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }

    const changeTheme = (e) => {
        if (e.target.checked) setDarkTheme()
        else setLightTheme()
    }

    return (
        <div>
            <label className="switch">
                <input id={'toggle'} onChange={(e) => changeTheme(e)} className={'toggle-input'} type="checkbox"/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}


export {
    Toggle
};
