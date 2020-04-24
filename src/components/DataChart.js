import React, { useEffect, useState } from 'react';
import './styles/DataChart.css';
import { useCountUp } from 'react-countup';
import { AreaChart, Area, Tooltip } from 'recharts';

const DataChart = ({ color, bg, accent, label, type, data }) => {
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
                    setFetchedData(newData.slice(0, 15));
                    break;
                case 'recovered':
                    newData = data.map((item) => ({
                        countryRegion: item.countryRegion,
                        recovered: item.recovered,
                    }));
                    setFetchedData(newData.slice(0, 15));
                    break;
                default:
                    newData = data.map((item) => ({
                        countryRegion: item.countryRegion,
                        deaths: item.deaths,
                    }));
                    setFetchedData(newData.slice(0, 15));
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
export default DataChart;
