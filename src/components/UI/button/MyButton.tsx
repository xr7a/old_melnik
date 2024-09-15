// @ts-ignore
import React, {PropsWithChildren} from 'react';
import './MyButton.css'
interface IButton {
    colorBehavior: 'primary' | 'secondary'
    type?: string 
}
const MyButton : React.FC<PropsWithChildren<IButton>> = 
    ({
         colorBehavior,
         type,
         children
    }) =>
    {
    return (
        <button className={`myBtn ver-${colorBehavior} ${type || ''}`}>
            {children}
        </button>
    );
};

export default MyButton;