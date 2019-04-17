import React from 'react';


//you can also destructure in the parameter list ({input,type="text",label,id,col='s12',meta:{error,touched}})=>{}
export default props => {
    const {input,type="text",label,id,col='s12',meta:{error,touched}}=props;
    return(
        <div className={`input-field col ${col}`}>
            <input type={type} {...input} id={id} />
            <label htmlFor={id}>{label}</label>
            <p className="red-text">{touched && error}</p>
        </div>
    )
}
