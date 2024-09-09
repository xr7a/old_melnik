import React from 'react';
import "./PipeLine.modules.css"
const PipeLine = ({title, images = []}) => {
    return (
        <div>
            <div className="section-divider">
                <div className="line"/>
                <span>{title}</span>
                <div className="line"/>
            </div>
            <img src="../../../img/harvard.png" alt=""/>
            <div className="images">
                {images.map((image, index) => (
                    <img key={index} src={image} alt=""/>
                ))
                }
            </div>
        </div>
    );
};

export default PipeLine;