import React, { useState, useEffect } from 'react';
import './App.css';
import Bubble from './components/Bubble';
import BottomSheet from './components/BottomSheet';

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
            setConfirmed(confirmed.value);
            setRecovered(recovered.value);
            setDeaths(deaths.value);
            fetchCountries(countries);
        };
        fetchData();
    }, []);
    return (
        <div className='App'>
            <div className='bs-icon' onClick={() => setShowBS(true)}>
                <i className='material-icons'>filter_list</i>
            </div>
            <div className='title'>Covid Around the World</div>
            <Bubble color='#F57C00' label='CONFIRMED' data={confirmed} />
            <Bubble color='#66BB6A' label='RECOVERED' data={recovered} />
            <Bubble color='#E53935' label='DEATHS' data={deaths} />
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
