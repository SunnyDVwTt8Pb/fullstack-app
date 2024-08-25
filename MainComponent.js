import React, { useState } from 'react';
import './style.css';


const MainComponent = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Parse JSON input
            const parsedInput = JSON.parse(jsonInput);

            // Call the backend API
            const response = await fetch('http://localhost:5000/process-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput),
            });

            // Parse response
            const data = await response.json();
            setResponseData(data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input. Please enter a valid JSON.');
            setResponseData(null);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div>
                <h3>Response Data</h3>
                <ul>
                    {selectedOptions.includes('Alphabets') && (
                        <li>Alphabets: {responseData.alphabets.join(', ')}</li>
                    )}
                    {selectedOptions.includes('Numbers') && (
                        <li>Numbers: {responseData.numbers.join(', ')}</li>
                    )}
                    {selectedOptions.includes('Highest lowercase alphabet') && (
                        <li>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</li>
                    )}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <h1>JSON Input Processor</h1>
            <input
                value={jsonInput}
                onChange={handleInputChange}
                placeholder='Enter JSON here'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {responseData && (
                <>
                    <h2>Filter Respone:</h2>

                    <select  onChange={handleOptionChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                </>
            )}

            {renderResponse()}
        </div>
    );
};

export default MainComponent;
