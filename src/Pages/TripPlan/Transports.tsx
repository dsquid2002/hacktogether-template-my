import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/Transports.scss'; // Import custom SCSS
import { useStateTogether } from 'react-together';

const Transports: React.FC = () => {
    const [selectedTransport, setSelectedTransport] = useStateTogether<string>('selectedTransport', '');

    return (
        <div className="transports-card"> {/* Applying the custom card class */}
            <div className="transports-container">
                <h2 className="transports-header">Select Transport</h2> {/* Header */}
                
                {/* Horizontal layout for radio buttons */}
                <div className="transports-field-container">
                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="car" 
                            name="transport" 
                            value="Car" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Car'} 
                        />
                        <label htmlFor="car">Car</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="plane" 
                            name="transport" 
                            value="Plane" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Plane'} 
                        />
                        <label htmlFor="plane">Plane</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="bus" 
                            name="transport" 
                            value="Bus" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Bus'} 
                        />
                        <label htmlFor="bus">Bus</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="boat" 
                            name="transport" 
                            value="Boat" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Boat'} 
                        />
                        <label htmlFor="boat">Boat</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="train" 
                            name="transport" 
                            value="Train" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Train'} 
                        />
                        <label htmlFor="train">Train</label>
                    </div>
                </div>

                {/* Info Section */}
                {selectedTransport && (
                    <div className="transports-info">
                        <p>You have selected: <strong>{selectedTransport}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transports;
