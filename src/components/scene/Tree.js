import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "react-three-fiber";
import { Bauble } from '../scene';

const Tree = ({ setBaublePreview, baubles, setBaubles, position, color, speed, args }) => {
    
    const addBauble = (point) => {
        const newElement = <Bauble position={[point.x, point.y, point.z]} color='red' args={[.2, 10, 10]}/>;
        setBaubles([...baubles, newElement]);
    }

    const showBaublePreview = (point) => {
        setBaublePreview(<Bauble preview position={[point.x, point.y, point.z]} color='blue' args={[.2, 10, 10]}/>);
    }
    
    return (
        <mesh
        onPointerDown={e => addBauble(e.point)}
        onPointerMove={e => showBaublePreview(e.point)}
        position={position}
        castShadow>
            <coneBufferGeometry attach='geometry' args={args} />
            <meshStandardMaterial attach='material' color={color} />
        </mesh>
    );

}

export default Tree;