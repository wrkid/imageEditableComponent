import React, { useEffect, useState } from "react";

import './ImageEditable.scss';
import ImageMenu from "../ImageMenu/ImageMenu";

import image from '../../assets/images/img.jpg'
import ContextMenu from "../ContextMenu/ContextMenu";

const ImageEditable = () => {

    const [ imageChoosen, setImageChoosen ] = useState(false);

    const [ imageMenu, setImageMenu ] = useState(false);

    const [ curImage, setCurImage ] = useState(image);

    const [ points, setPoints ] = useState({});

    const [ clicked, setClicked ] = useState(false);

    const handleClick = () => {
        setClicked(true);
    }

    const handleImageMenu = () => {
        setClicked(false)
        setImageMenu(prev => !prev)
    }

    const handleImageChange = (item) => {
        if (!item.url) {
            setImageChoosen(false)
        } else {
            setCurImage(item.url);
            setImageChoosen(true);
        }
    }

    const handleDeleteImage = () => {
        setImageChoosen(false);
    }

    const imageEditBox = (
        <div className="image-editable-container">
            <div className="image-editable-container__header">
                <span className="close-btn">x</span>
            </div>
            <div className="image-editable-container__content">
                <button className="image-editable-container__button"
                    onClick={() => handleImageMenu()}>Choose image</button>
            </div>
        </div>
    );

    const img = (
        <>
            <img className="image" 
                src = {curImage} 
                alt="kartinka1213"
                onContextMenu={(e) => {
                    e.preventDefault();
                    setPoints({x: e.pageX, y: e.pageY})
                    handleClick();
                }}>
            </img> 
            {clicked ? <ContextMenu props={points} 
                handleImageMenu={handleImageMenu}
                handleDeleteImage={handleDeleteImage}/> : null}
        </>
    );

    return (
        <>
            {imageMenu ? 
                <ImageMenu handleImageMenu={handleImageMenu}
                    handleImageChange={handleImageChange}/> 
                : null}
            { imageChoosen ? img : imageEditBox }
        </>
    );
}

export default ImageEditable;