const PaymentModal = ({ isOpen, onClose, onSubmit, userInfo, setUserInfo }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
            <h2>Enter Payment Details</h2>
            <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={{ display: 'block', margin: '10px 0' }}
            />
            <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={{ display: 'block', margin: '10px 0' }}
            />
            <input
                type="text"
                name="contact"
                value={userInfo.contact}
                onChange={handleChange}
                placeholder="Your Contact Number"
                style={{ display: 'block', margin: '10px 0' }}
            />
            <button onClick={() => onSubmit(userInfo)}>Proceed to Pay</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
export default PaymentModal;