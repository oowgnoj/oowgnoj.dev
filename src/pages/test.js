import React, { useEffect } from 'react';
import axios from 'axios';

const Hello = () => {
    useEffect(() => {
        async function getDate() {
            const data = await axios.get('http://localhost:4500/test');
            console.log(data);
        }
        getDate();
    }, []);

    return <div>하이</div>;
};
export default Hello;
