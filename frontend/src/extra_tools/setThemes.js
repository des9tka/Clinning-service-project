const setThemes = () => {

    if (localStorage.getItem('theme') === 'dark') document.querySelector('body').setAttribute('data-theme', 'dark') && console.log(1)
    else document.querySelector('body').setAttribute('data-theme', 'light') && console.log(2)
}


export {
    setThemes
}
