import React from 'react';


export default props => {
    console.log('Input Props: ',props);
    const {input,type="text",label,id,col='s12'}=props;
    return(
        <div className={`input-field col ${col}`}>
            <input type={type} {...input} id={id} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
