const EmployeesAboutPage = () => {

    return (
        <div className={'info-div'}>
            <h2>Some info</h2><br/>
            <h3>Orders Page:</h3>
            <div>
                - List of orders that give abilities to take some of them. <br/>
            </div><br/>
            <h3>Office Page:</h3> <br/><br/>
            <div>
                - Allow to track two types of orders - "Taken" and "Done". <br/>
                - Rate the conditions and relations to the order and employees. <br/>
                - Change the status of order from "Taken" to "Done".
            </div>
        </div>
    )
}

export {
    EmployeesAboutPage
};
