import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
    return (
        <div>
            <label style={{ color: 'whitesmoke' }}>{label}</label>
            <input
                {...input} type={type}
            />
            <div className="red-text">
                {touched && error}
            </div>
        </div>
    );

}