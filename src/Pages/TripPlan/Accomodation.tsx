import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/Transports.scss'; // Import custom SCSS

const Accomodation: React.FC = () => {
    const [selectedTransport, setSelectedTransport  ] = useState<string>('');

    return (
        <div className="transports-card"> {/* Applying the custom card class */}
            <div className="transports-container">
                <h2 className="transports-header">Select your accommodation</h2> {/* Header */}
                
                {/* Horizontal layout for radio buttons */}
                <div className="transports-field-container">
                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="hotel" 
                            name="accommodation" 
                            value="Hotel" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Hotel'} 
                        />
                        <label htmlFor="hotel">Hotel</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="hostel" 
                            name="accommodation" 
                            value="Hostel" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Hostel'} 
                        />
                        <label htmlFor="hostel">Hostel</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="rented" 
                            name="accommodation" 
                            value="Rented" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Rented'} 
                        />
                        <label htmlFor="rented">Rented</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="camping" 
                            name="accommodation" 
                            value="Camping" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Camping'} 
                        />
                        <label htmlFor="camping">Camping</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="family" 
                            name="accommodation" 
                            value="Family" 
                            onChange={(e) => setSelectedTransport(e.value)} 
                            checked={selectedTransport === 'Family'} 
                        />
                        <label htmlFor="family">Family</label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Accomodation;
