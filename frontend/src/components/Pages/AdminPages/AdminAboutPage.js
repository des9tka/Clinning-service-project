const AdminAboutPage = () => {

    return (
        <div className={'info-wrap'}>
            <div className={'info-div'}>
                <h2>Some info</h2><br/>
                <h3>Users Page: can change status of users.</h3>
                <div>
                    - Status Active: from true to false and reverse. <br/>
                    - Status Employee: from true to false and reverse. <br/>
                    - Back to User.
                </div>
                <br/>
                <h3>Orders Page: 3 order statuses.</h3>
                <div>
                    - "Waiting for approved" status need for approved an order with providing price and employees quantity. <br/>
                    - "Taken" status gives ability for removing employee from the order for some reasons. <br/>
                    - "Rejected" status gives ability of tracking rejected orders.
                </div>
            </div>
        </div>
    )
}

export {
    AdminAboutPage
};
