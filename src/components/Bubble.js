import React, { useEffect } from 'react';
import './styles/Bubble.css';
import { useCountUp } from 'react-countup';

const Bubble = ({ color, label, data }) => {
    const { countUp, update } = useCountUp({
        start: 0,
        end: data,
        separator: ',',
        duration: 1.5,
    });
    useEffect(() => {
        update(data);
    }, [data, update]);
    return (
        <div className='bw'>
            <div className='bw-bo' style={{ background: color }}>
                <div className='bw-bi'>
                    <h1>{countUp}</h1>
                    <p style={{ color }}>{label}</p>
                </div>
            </div>
        </div>
    );
};
export default Bubble;
