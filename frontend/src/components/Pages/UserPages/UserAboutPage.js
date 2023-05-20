const UserAboutPage = () => {

    return (
        <div className={'info-wrap'}>
            <div className={'info-div'}>
                <h2>Some info</h2><br/>
                <h3>Office Page:</h3> <br/>
                <div>
                    - List of orders that you can track. <br/>
                    - Time for orders must be no earlier than time now plus 3 hours. <br/>
                    - Orders after posting by user fall into the order status "Pending". <br/>
                    - After approving order by admin order changes status to "Waiting for approved" where user confirm order with price and employee. <br/>
                    - If user confirm order it changes status to "Approved" and will stay there until employee will not take it (Change status to
                    "Taken"). <br/>
                    - If user reject order it changes status to "Rejected". <br/>
                    - When the order will be done it changes status to "Done" and by following the pay link you will able to pay to order, before rate the
                    employees. <br/>
                    - Time line of order payment - 3 days.
                </div>
            </div>
        </div>
    )
}

export {
    UserAboutPage
};
