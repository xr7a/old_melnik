// @ts-ignore
import React, {FC} from 'react';
// @ts-ignore
import MyButton from '../UI/button/MyButton.tsx';
// @ts-ignore
import Card from "../UI/cards/Card.tsx";
import './ForProjects.css'

const ForProjects: FC = () => {
    return (
        <div className="bg-white-gray bgImage rounded-tl-[200px] pt-[200px] pr-[370px] pl-[370px] pb-[200px]">
        <div className='flex flex-col gap-[40px] '>
            <div className='font-popBold font-bold'>
                <div className='text-primary text-[18px]'>— For Projects</div>
                <div className='text-body text-[52px]'>Vision is the <span className='text-primary text-[52px] font-bold'>answer</span></div>
                <div className='font-normal'>
                    You have an idea, IncuPie has a plan. 
                    We offer everything you need <br/> to go from an early-stage idea to a successful exchange listing.
                </div>
            </div>
            <div className='grid grid-cols-2 gap-[20px]'>
                <Card version={'02'} 
                      title={'Decentralized investments'} 
                      description={"we'll distribute your tokens among our huge and active community"}/>
                <Card version={'02'} 
                      title={'Access to professional investors'} 
                      description={"we'll put you in touch with funds and business angels ready to invest larger sums"}/>
                <Card version={'02'} 
                      title={'Exchange relations'} 
                      description={"get better terms when listing your token"}/>
                <Card version={'02'} 
                      title={'Staking'}
                      description={"allow users to stake your tokens on DeFiPie and earn rewards"}/>
                <Card version={'02'} 
                      title={'Product-market fit analysis'}/>
                <Card version={'02'} 
                      title={'Detailed tokenomics'}/>
                <Card version={'02'} 
                      title={'Smart contract audit'}/>
                <Card version={'02'} 
                      title={'Community-building and social media marketing'}/>
                <Card version={'02'} 
                      title={'White Paper, blog, and media content from the best authors'}/>
            </div>
            <div className='flex gap-[12px]'>
                <MyButton colorBehavior={'primary'}>I Need Funding</MyButton>
                <MyButton colorBehavior={'secondary'}>Learn More</MyButton>
            </div>
        </div>
        </div>
    );
};

export default ForProjects;