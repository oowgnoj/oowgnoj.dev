import React, { useEffect } from 'react';
import axios from 'axios';

const Hello = () => {
    useEffect(() => {
        async function getDate() {
            const data = await axios.get('http://52.78.122.131/api/test');
            console.log(data);
        }
        getDate();
    }, []);

    return <div>하이</div>;
};
export default Hello;
