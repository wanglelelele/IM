import React from 'react'
import './ImageElement.less'
const ImageElement = (props) => {
    return (
        <div className="image-container">
            <img className="image-element" src={props.payload.file.dataUrl} />
        </div>
    )
}
export default ImageElement