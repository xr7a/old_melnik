import React from 'react';
import "./PipeLine.modules.css"
import "../../../index.css"
const PipeLine = ({title, images = []}) => {
    return (
        <div>
            <div className="section-divider pb-12">
                <div className="line"/>
                <span>{title}</span>
                <div className="line"/>
            </div>
            <img src="../../../assets/harvard.png" alt=""/>
            <div className="flex justify-center gap-5 opacity-50">
                {images.map((image, index) => (
                    <img key={index} src={image} alt=""/>
                ))
                }
            </div>
        </div>
    );
};

export default PipeLine;