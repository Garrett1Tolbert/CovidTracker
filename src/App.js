import React, { useState, useEffect } from 'react';
import './App.css';
import Bubble from './components/DataChart';
import BottomSheet from './components/BottomSheet';
import logo from './res/logo.png';

function App() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [confirmed, setConfirmed] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [countries, setCountries] = useState([]);
    const [showBS, setShowBS] = useState(false);

    useEffect(() => {
        const fetchCountries = async (url) => {
            const response = await fetch(url);
            const { countries } = await response.json();
            setCountries(countries);
        };
        const fetchData = async () => {
            const response = await fetch('https://covid19.mathdro.id/api');
            const {
                confirmed,
                recovered,
                deaths,
                countries,
            } = await response.json();
            setConfirmed(confirmed);
            setRecovered(recovered);
            setDeaths(deaths);
            fetchCountries(countries);
        };
        fetchData();
    }, []);

    return (
        <div className='App'>
            <div className='bs-icon' onClick={() => setShowBS(true)}>
                <i className='material-icons'>filter_list</i>
            </div>
            <img className='logo' alt='logo' src={logo} />
            <Bubble
                color='#F57C00'
                bg='#FFCC80'
                label='CONFIRMED'
                data={confirmed}
                type='confirmed'
                accent='#fff3e0'
            />
            <Bubble
                color='#66BB6A'
                bg='#A5D6A7'
                label='RECOVERED'
                data={recovered}
                type='recovered'
                accent='#E8F5E9'
            />
            <Bubble
                color='#E53935'
                bg='#EF9A9A'
                label='DEATHS'
                data={deaths}
                type='deaths'
                accent='#FFEBEE'
            />
            <BottomSheet
                countries={countries}
                show={showBS}
                closeFn={setShowBS}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                showData={!!selectedCountry}
            />
        </div>
    );
}

export default App;
