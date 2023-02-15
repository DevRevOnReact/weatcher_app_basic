import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './reducers/weatherSlice';

function Weather() {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(location));
        setLocation('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </label>
                <button type="submit">Get weather</button>
            </form>
            {weather.status === 'loading' && <div style="color: red;">Loading...</div>}
            {weather.status === 'succeeded' && (
                <div>
                    <h2>Current weather</h2>
                    <p>Temperature: {weather.current.temp}°C</p>
                    <p>Description: {weather.current.weather[0].description}</p>
                    <h2>Forecast</h2>
                    {weather.forecast.map((item, index) => (
                        <div key={index}>
                            <p>Date/time: {item.dt_txt}</p>
                            <p>Temperature: {item.main.temp}°C</p>
                            <p>Description: {item.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}
            {weather.status === 'failed' && <div>{weather.error.message}</div>}
        </div>
    );
}

export default Weather