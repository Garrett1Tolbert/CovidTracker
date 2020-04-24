import React, { useEffect, useState } from 'react';
import './styles/Bubble.css';
import { useCountUp } from 'react-countup';
import { AreaChart, Area, Tooltip } from 'recharts';

const thisData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        recovered: 22,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        recovered: 10,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        recovered: 62,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        recovered: 12,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        recovered: 21,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        recovered: 45,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        recovered: 12,
        amt: 2100,
    },
];
const Bubble = ({ color, bg, accent, label, type, data }) => {
    const { countUp, update } = useCountUp({
        start: 0,
        end: data,
        separator: ',',
        duration: 1.5,
    });
    const [fetchedData, setFetchedData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://covid19.mathdro.id/api/${type}`
            );
            const data = await response.json();
            let newData;
            switch (type) {
                case 'confirmed':
                    newData = data.map((item) => ({
                        countryRegion: item.countryRegion,
                        confirmed: item.confirmed,
                    }));
                    // console.log(
                    //     newData.map((item, idx) => (idx > 30 ? null : item))
                    // );
                    console.log(newData.slice(0, 35));

                    setFetchedData(newData.slice(0, 10));
                    break;
                case 'recovered':
                    newData = data.map((item) => ({
                        countryRegion: item.countryRegion,
                        recovered: item.recovered,
                    }));
                    console.log(newData);
                    setFetchedData(newData.slice(0, 10));
                    break;
                default:
                    newData = data.map((item) => ({
                        countryRegion: item.countryRegion,
                        deaths: item.deaths,
                    }));
                    console.log(newData);
                    setFetchedData(newData.slice(0, 10));
                    break;
            }
        };
        fetchData();
    }, [type]);
    useEffect(() => {
        update(data.value);
    }, [data, update]);
    return (
        <div className='bw'>
            <div className='info'>
                <h1>{countUp}</h1>
            </div>
            <div className='details' style={{ color, backgroundColor: accent }}>
                    <p>DETAILS</p>
                </div>
            <div className='tag' style={{ color, backgroundColor: accent }}>
                <p>{label}</p>
            </div>
            <AreaChart
                width={window.innerWidth}
                height={window.innerHeight * 0.25}
                data={fetchedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <Tooltip />
                <Area type='monotone' dataKey={type} stroke={color} fill={bg} />
            </AreaChart>
        </div>
    );
};
export default Bubble;
