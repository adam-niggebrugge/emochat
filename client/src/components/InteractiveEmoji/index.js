import React, { useState } from 'react';
import { useMousePosition } from "./useMousePosition";
import "./style.css";

const InteractiveEmoji = () => {
    const [mousePosition, setMousePosition] = useState({
        x : 0,
        y : 0
    });

    function handleMouseMove(ev) { setMousePosition({

        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientWidth / 2);
        let radian = Math.atan2(ev.pageX - x, ev.pageY - y);
        rot_eye = (radian * (180 / Math.PI) * -1) + 0;
        eye.style.transform = "rotate("+ rot_eye +"deg)";
        });
    }

    return (
        <div className="faceContainer"
            onMouseMove={(ev)=> handleMouseMove(ev)}
            >
            <div className="face">
                <div className="eyes">
                    <div className="eye" style={}></div>
                    <div className="eye" style={}></div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveEmoji;