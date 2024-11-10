import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/Accomodation.scss'; // Import custom SCSS
import { useStateTogether } from 'react-together';


const Accomodation: React.FC = () => {
    const [selectedAccomodation, setSelectedAccomodation] = useStateTogether<string>('selectedAccomodation', '');

    return (
        <div className="accomodation-card"> {/* Applying the custom card class */}
            <div className="accomodation-container">
                <h2 className="accomodation-header">Select Accommodation</h2> {/* Header */}
                
                {/* Horizontal layout for radio buttons */}
                <div className="accomodation-field-container">
                    <div className="p-field-radiobutton accomodation-field">
                        <RadioButton 
                            inputId="hotel" 
                            name="accommodation" 
                            value="Hotel" 
                            onChange={(e) => setSelectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Hotel'} 
                        />
                        <label htmlFor="hotel">Hotel</label>
                    </div>

                    <div className="p-field-radiobutton accomodation-field">
                        <RadioButton 
                            inputId="hostel" 
                            name="accommodation" 
                            value="Hostel" 
                            onChange={(e) => setSelectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Hostel'} 
                        />
                        <label htmlFor="hostel">Hostel</label>
                    </div>

                    <div className="p-field-radiobutton accomodation-field">
                        <RadioButton 
                            inputId="rented" 
                            name="accommodation" 
                            value="Rented" 
                            onChange={(e) => setSelectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Rented'} 
                        />
                        <label htmlFor="rented">Rented</label>
                    </div>

                    <div className="p-field-radiobutton accomodation-field">
                        <RadioButton 
                            inputId="camping" 
                            name="accommodation" 
                            value="Camping" 
                            onChange={(e) => setSelectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Camping'} 
                        />
                        <label htmlFor="camping">Camping</label>
                    </div>

                    <div className="p-field-radiobutton accomodation-field">
                        <RadioButton 
                            inputId="family" 
                            name="accommodation" 
                            value="Family" 
                            onChange={(e) => setSelectedAccomodation(e.value)} 
                            checked={selectedAccomodation === 'Family'} 
                        />
                        <label htmlFor="family">Family</label>
                    </div>
                </div>

                {/* Info Section for selected accommodation */}
                {selectedAccomodation && (
                    <div className="accomodation-info">
                        <p>You have selected: <strong>{selectedAccomodation}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accomodation;
