import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import SyncLoader from 'react-spinners/SyncLoader';
import moment from 'moment';

const CountryChart = ({ country }) => {
    const [countryDetails, setCountryDetails] = useState(null);
    const [timestamp, setTimestamp] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `https://covid19.mathdro.id/api/countries/${country.iso3}`
                );
                const { confirmed, deaths, lastUpdate } = await response.json();
                setCountryDetails([
                    {
                        name: country.name,
                        confirmed: confirmed.value,
                        deaths: deaths.value,
                    },
                ]);
                setTimestamp(moment(lastUpdate).format('LLLL'));
            } catch (error) {
                console.log(`error: ${error}`);
            }
        };
        if (country) fetchDetails();
    }, [country]);
    return (
        <div className='chart'>
            {!countryDetails ? (
                <SyncLoader size={35} color={'#203a43'} loading />
            ) : (
                <>
                    <BarChart
                        width={window.innerWidth}
                        height={300}
                        data={countryDetails}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='confirmed' fill='#F57C00' />
                        <Bar dataKey='deaths' fill='#E53935' />
                    </BarChart>
                    <p className='lu'>Last updated {timestamp}</p>
                </>
            )}
        </div>
    );
};
export default CountryChart;
