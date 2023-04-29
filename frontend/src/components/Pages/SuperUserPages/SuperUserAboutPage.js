const SuperUserAboutPage = () => {

    return (
        <div className={'info-wrap'}>
            <div className={'info-div'}>
                <h2>Some info</h2><br/>
                <h3>Service Page: allow to manipulate to services.</h3>
                <div>
                    - Create Services. <br/>
                    - Change Services info. <br/>
                    - Delete Services.
                </div>
                <br/>
                <h3>Users Page: can change users attributes.</h3>
                <div>
                    - Status Active: from true to false and reverse. <br/>
                    - Status Employee: from true to false and reverse. <br/>
                    - Status Admin: from true to false and reverse. <br/>
                    - Delete Users. <br/>
                    - Back to User. <br/>
                </div>
                <br/>
                <h3>Orders Page: track all orders.</h3>
                <div>
                    - Track all orders by statuses. <br/>
                    - Delete Orders.
                </div>
            </div>
        </div>
    )
}

export {
    SuperUserAboutPage
};
