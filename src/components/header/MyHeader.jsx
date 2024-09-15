import React from 'react';
import './Header.modules.css'
import logo1 from '../../assets/logo1.svg'
import MyButton from "../UI/button/MyButton.tsx";

const MyHeader = () => {
    return (
        <header>
            <div className='logo'>
                <img src={logo1} alt=""/>
                <div className='logo-name'>Vision Capital</div>
            </div>
            <nav>
                <div className='nav-a'>
                    <a href="">For Projects</a>                    
                    <a href="">For Investors</a>                    
                </div>
                <MyButton colorBehavior={"primary"} type={"inHeader"}>Join Now</MyButton>
            </nav>
        </header>
    );
};

export default MyHeader;