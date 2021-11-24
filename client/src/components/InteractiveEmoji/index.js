import React, { createRef, useState, useRef } from 'react';
import { useMousePosition } from "./MousePosition";
import "./style.css";

const InteractiveEmoji = () => {
    //helper of mouse position is returned here
    const position = useMousePosition();

    const [style, setStyle] = useState({
        eyeStyle: {
            transform: "rotate 0 deg", 
        },
    });

    const refPosition = useRef();
    const leftEye = createRef();

    function handleMouseMove(ev) { 
        let x = (refPosition.current.getBoundingClientRect().left) + (leftEye.current.offsetWidth / 2);
        let y = (refPosition.current.getBoundingClientRect().top) + (leftEye.current.offsetWidth / 2);
        let radian = Math.atan2(position.x - x, position.y - y);
        let rot = (radian * (180 / Math.PI) * -1) + 0;
        let resetStyle = "rotate"+rot+"deg";
        setStyle({eyeStyle: {
            transform: resetStyle, 
        },});
    }

    return (
        <div ref={refPosition} className="faceContainer"
            onMouseMove={(ev)=> handleMouseMove(ev)}
            >
            <div className="face">
                <div className="eyes">
                    <div ref={leftEye} className="eye" style={style.eyeStyle}></div>
                    <div className="eye" style={style.eyeStyle}></div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveEmoji;