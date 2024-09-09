import React from 'react';
import classes from "./MyButton.module.css"
const MyButton1 = ({children, inHeader, ...props}) => {
    return (
        <button {...props} className={`${classes.myBtn} ${classes.ver1} ${inHeader ? classes.head : ''}`}>{children}</button>
    );
};

export default MyButton1;