import React from 'react';
import MyButton1 from "../UI/button/MyButton1";
import MyButton2 from "../UI/button/MyButton2";
import style from './StartComp.module.css'

const StartComp = () => {
    return (
        <div className={style.container}>
            <h1>Vision Capital</h1>
            <p>The right way to fund and incubate your DeFi startup</p>
            <div className={style.buttons}>
                <MyButton1>I Need Funding</MyButton1>
                <MyButton2>Become an Investor</MyButton2>
            </div>
        </div>
    );
};

export default StartComp;