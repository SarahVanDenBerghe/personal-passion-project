import React, { useRef, useState } from "react";

const Bauble = ({ position, color, speed, args, preview }) => {
    return (
        <mesh
        position={position}
        castShadow>
            <sphereBufferGeometry attach='geometry' args={args} />
            <meshStandardMaterial attach='material' color={color} opacity={0.1} transparent={preview ? true : false} />
        </mesh>
    );

}

export default Bauble;