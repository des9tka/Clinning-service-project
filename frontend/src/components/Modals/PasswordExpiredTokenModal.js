const PasswordExpiredTokenModal = ({navigate}) => {

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h1>Session is Expired!!!</h1>
                <button onClick={() => navigate('/auth/request_password_recovery')}>OK</button>
            </div>
        </div>
    )
}

export {
    PasswordExpiredTokenModal
};
