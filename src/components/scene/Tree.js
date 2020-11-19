import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "react-three-fiber";
import { Bauble } from '../scene';
import axios from "axios";

const api = axios.create({
  baseURL: 'https://xmas-ppp-api.herokuapp.com/messages'
});

const Tree = ({ setBaublePreview, baubles, setBaubles, position, color, speed, args }) => {
    useEffect(() => {
        // TO CHECK: async / await juist
        // Tutorial: https://www.youtube.com/watch?v=12l6lkW6JhE&ab_channel=AdrianTwarog
        api.get('/').then(async response => {
            let allBaubles = [];
            await response.data.map((bauble, i) => {
                allBaubles.push(<Bauble key={i} position={[bauble.x, bauble.y, bauble.z]} color='red' args={[.2, 10, 10]}/>);
            });
            setBaubles(allBaubles);
        })
    }, []);

    const addBauble = (point) => {
        api.post('/', {
            name: 'Default',
            x: point.x,
            y: point.y,
            z: point.z
        })

        const newBauble = <Bauble key={baubles.length} position={[point.x, point.y, point.z]} color='red' args={[.2, 10, 10]}/>;
        setBaubles([...baubles, newBauble]);
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