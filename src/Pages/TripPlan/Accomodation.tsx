import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/Transports.scss'; // Import custom SCSS
import { useStateTogether } from 'react-together';


const Accomodation: React.FC = () => {
    const [selectedAccomodation, setselectedAccomodation  ] = useStateTogether<string>('selectedAccomodation','');

    return (
        <div className="transports-card"> {/* Applying the custom card class */}
            <div className="transports-container">
                <h2 className="transports-header">Select Accommodation</h2> {/* Header */}
                
                {/* Horizontal layout for radio buttons */}
                <div className="transports-field-container">
                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="hotel" 
                            name="accommodation" 
                            value="Hotel" 
                            onChange={(e) => setselectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Hotel'} 
                        />
                        <label htmlFor="hotel">Hotel</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="hostel" 
                            name="accommodation" 
                            value="Hostel" 
                            onChange={(e) => setselectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Hostel'} 
                        />
                        <label htmlFor="hostel">Hostel</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="rented" 
                            name="accommodation" 
                            value="Rented" 
                            onChange={(e) => setselectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Rented'} 
                        />
                        <label htmlFor="rented">Rented</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="camping" 
                            name="accommodation" 
                            value="Camping" 
                            onChange={(e) => setselectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Camping'} 
                        />
                        <label htmlFor="camping">Camping</label>
                    </div>

                    <div className="p-field-radiobutton transports-field">
                        <RadioButton 
                            inputId="family" 
                            name="accommodation" 
                            value="Family" 
                            onChange={(e) => setselectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Family'} 
                        />
                        <label htmlFor="family">Family</label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Accomodation;
