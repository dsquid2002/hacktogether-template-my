import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';

const Destiny: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [submittedDestination, setSubmittedDestination] = useState('');

    const handleSubmit = () => {
        setSubmittedDestination(destination);
    };

    return (
        <Card title="Destiny" style={{ width: '25em', margin: 'auto', marginTop: '2em' }}>
            <div className="container">
                <h2>Enter Your Trip Destination</h2>
                <div className="p-field">
                    <label htmlFor="destination">Destination</label>
                    <InputText 
                        id="destination" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                    <Button label="Submit" onClick={handleSubmit} />
                </div>
                {submittedDestination && (
                    <div className="p-mt-3">
                        <h3>Your Destination:</h3>
                        <p>{submittedDestination}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default Destiny;