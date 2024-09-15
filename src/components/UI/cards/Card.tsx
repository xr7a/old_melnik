// @ts-ignore7
import React, {FC} from 'react';
import '../../../index.css'
// @ts-ignore
import icon1 from '../../../assets/icon_checled.svg';
interface CardProps {
    version: "01" | "02",
    number?: number,
    title?: string,
    description?: string
    children?: React.ReactNode | React.ReactChild
}
const Card: FC<CardProps> = 
    ({
         version,
         number,
         title,
         description,
         children
     }) => {
    return (
        <div className='p-[32px] pr-[24px] pl-[24px] font-popMedium font-bold shadow-xl rounded-[8px] w-[580px] leading-[28px] bg-[#FFFFFF]'>
            {version === '01' ?
                <div className='flex gap-[12px] '>
                    <div className='text-[24px] text-primary'>0{number}</div>
                    <div className='text-[18px] text-body '>{children}</div>
                </div>
                : 
                <div className='flex gap-[12px]'>
                    <div className='flex items-start'>
                        <img src={icon1} alt=""/>
                    </div>
                    {description == null ?
                        <div>
                            <div className='text-main text-[16px] flex items-center'>{title}</div>
                        </div>
                        :
                        <div>
                            <div className='text-main text-[16px]'>{title}</div>
                            <div className='text-main-gray text-[14px]'>{description}</div>
                        </div>
                    }
                    
                </div>
            }
        </div>
    );
};

export default Card;