import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import 'src/styles/TripPlan/Observations.scss'; // Import custom CSS
import { useStateTogether } from 'react-together';

const Observations: React.FC = () => {
    const [observation, setObservation] = useState('');
    const [observations, setObservations] = useStateTogether<string[]>('observations', []);

    const handleSubmit = () => {
        if (observation.trim()) {
            // Append new observation
            const newObservations = [...observations, observation.trim()];
            setObservations(newObservations);
            setObservation('');
        } else {
            alert('Please enter an observation before submitting.');
        }
    };

    const handleDelete = (index: number) => {
        // Remove observation by index
        const updatedObservations = observations.filter((_, i) => i !== index);
        setObservations(updatedObservations);
    };

    return (
        <Card title="Observations" className="p-shadow-5 " style={{ marginBottom: '1rem' }}>
            <div className="destiny-container p-fluid">
                <div className="p-field destiny-field">
                    <label htmlFor="observation" className="p-d-block">
                        What Should Be Considered? (Allergies, Food Restrictions, etc...)
                    </label>
                    <InputText
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        className="p-inputtext-lg p-d-block"
                        placeholder="Enter your observation"
                    />
                </div>
                <div className="destiny-button-container p-d-flex p-jc-center p-mt-3">
                    <Button
                        label="Submit"
                        onClick={handleSubmit}
                        className="p-button-rounded p-button-primary"
                    />
                </div>

                {/* Display Observations List */}
                {observations.length > 0 && (
                    <div className="destiny-info show p-d-flex p-flex-column p-ai-center">
                        <ul className="observation-list">
                            {observations.map((obs, index) => (
                                <li key={index} className="p-d-flex p-jc-between p-ai-center">
                                    <span className="p-text-bold">{obs+" "}</span>
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-rounded p-button-danger p-button-sm delete-button"
                                        onClick={() => handleDelete(index)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default Observations;
