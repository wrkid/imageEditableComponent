import React, { useEffect } from "react";

import './ContextMenu.scss';

const ContextMenu = ({props, handleImageMenu, handleDeleteImage}) => {

    const style = {
        position: 'fixed',
        left: props.x,
        top: props.y
    }

    return (
        <div 
            className="context-menu"
            onContextMenu={(e) => e.preventDefault()}
            style={style}>
                <div onClick={() => handleImageMenu()}>Change Image</div>
                <div>Duplicate</div>
                <div onClick={() => handleDeleteImage()}>Delete</div>
        </div>
    );
}

export default ContextMenu;