import React from 'react';
import './styles/BottomSheet.css';
import CountryChart from './CountryChart';

const BottomSheet = ({
    show,
    countries,
    closeFn,
    selectedCountry,
    setSelectedCountry,
    showData,
    timestamp,
}) => {
    const resetBS = () => {
        closeFn(false);
        setSelectedCountry(null);
    };

    return (
        <div className={show ? 'bs-wrapper show' : 'bs-wrapper'}>
            <div className='overlay' onClick={resetBS} />
            <div className='bs-container'>
                <div className={showData ? 'module data' : 'module'}>
                    {countries.map((item, idx) => (
                        <div
                            key={idx}
                            className={
                                idx % 2 === 0 ? 'country-li' : 'country-li gray'
                            }
                            onClick={() => setSelectedCountry(item)}
                        >
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <div
                    className={
                        showData ? 'module data-sec data' : 'module data-sec'
                    }
                >
                    <div
                        className='back'
                        onClick={() => setSelectedCountry(null)}
                    >
                        <i className='material-icons'>keyboard_arrow_left</i>
                        <p>Back</p>
                    </div>
                    {!selectedCountry ? null : (
                        <div className='countryID'>
                            <h1>{selectedCountry.name}</h1>
                            <img
                                alt='country flag'
                                src={`https://www.countryflags.io/${selectedCountry.iso2.toLowerCase()}/flat/64.png`}
                            />
                        </div>
                    )}
                    <CountryChart country={selectedCountry} />
                </div>
            </div>
        </div>
    );
};
export default BottomSheet;
