import React, { useEffect } from "react";
import { Bauble } from '../scene';
import axios from "axios";

const getApiURL = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return `http://localhost:1337/messages`
    } else {
        return `${process.env.REACT_APP_STRAPI_API}`
    }
}

const api = axios.create({
  baseURL: getApiURL()
});

const Tree = ({ setBaublePreview, baubles, setBaubles, position, color, speed, args }) => {
    useEffect(() => {
        api.get('/').then(async response => {
            const getBaubles = response.data.map(bauble => {
                return <Bauble key={bauble.id} position={[bauble.x, bauble.y, bauble.z]} color='red' args={[.2, 10, 10]}/>;
            });
            setBaubles(getBaubles);
        })
    }, [setBaubles]);

    const addBauble = (point) => {
        api.post('/', {
            name: 'Default',
            x: point.x,
            y: point.y,
            z: point.z
        }).then(response => {
            const newBauble = <Bauble key={response.data.id} position={[point.x, point.y, point.z]} color='red' args={[.2, 10, 10]}/>;
            setBaubles([...baubles, newBauble]);
        })


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