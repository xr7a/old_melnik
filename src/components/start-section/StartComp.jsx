import React from 'react';
import './StartComp.css'
import '../../index.css'
import MyButton from "../UI/button/MyButton.tsx";

const StartComp = () => {
    return (
        <div className="container">
            <h1 className='text-heading'>Vision Capital</h1>
            <p className='text-description'>The right way to fund and incubate your DeFi startup</p>
            <div className='buttons'>
                <MyButton colorBehavior={"primary"}>I Need Funding</MyButton>
                <MyButton colorBehavior={"secondary"}>Become an Investor</MyButton>
            </div>
        </div>
    );
};

export default StartComp;