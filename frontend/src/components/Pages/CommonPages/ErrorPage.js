const ErrorPage = ({error}) => {

    return (
        <div className={'error-page'}>
            <h1>Sorry, an error has occurred</h1>
            <p>We apologize for the inconvenience, but an error has occurred on our site.</p>
            <h2>Please try the following:</h2>

            <h4>-Check the url link.</h4>
            <h4>-Refresh the page and try again.</h4>
            <h4>-Check your internet connection.</h4>
            <h4>-Try accessing the site from a different browser or device.</h4>

            {error && <h4>The error: "{error}"</h4>}
        </div>
    )
}

export {
    ErrorPage
};
