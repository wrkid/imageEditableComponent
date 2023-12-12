import React from "react";

import './ContainerDiv.scss';
import ImageEditable from "../ImageEditable/ImageEditable";

const ContainerDiv = () => {
    return (
        <div className="container-div">
            <div className="container-div__header" />
            <div className="container-div__content">
                <ImageEditable />
            </div>
        </div>
    );
}

export default ContainerDiv;