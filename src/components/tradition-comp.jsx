import React from 'react';
import "../index.css"
import Card from "./UI/cards/Card.tsx";
const TraditionComp = () => {
    return (
        <div className="flex justify-center mt-[200px] mb-[200px]">
            <div className='text-[52px] font-popBold font-bold leading-[64px] w-[600px]'>
                <p className='text-body'>Traditional<br/>
                    Fundraising
                    <p className='text-primary'>Doesn't Work</p>
                    In Defy
                </p>
                
            </div>
            <div className='flex flex-col gap-[12px]' >
                <Card version={'01'} number={1}>Without a big budget, it's hard to <br/> approach venture investors</Card>
                <Card version={'01'} number={2}>VCs don't care about your DeFi idea <br/> – only their gains</Card>
                <Card version={'01'} number={3}>They force you into selling your <br/> tokens at a huge discount…</Card>
                <Card version={'01'} number={4}>...Then dump them at the first <br/> opportunity</Card>
                <Card version={'01'} number={5}>Result: your token collapses. <br/> Everyone goes home.</Card>
            </div>
        </div>
    );
};

export default TraditionComp;