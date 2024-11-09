import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import 'src/styles/TripPlan/Observations.scss'; // Import custom CSS

interface Observation {
    name: string;
    text: string;
}

const Observations: React.FC = () => {
    const [name, setName] = useState('');
    const [observation, setObservation] = useState('');
    const [observations, setObservations] = useState<Observation[]>([]);

    const handleSubmit = () => {
        if (name && observation) {
            const newObservation: Observation = { name, text: observation };
            setObservations([...observations, newObservation]);
            setName('');
            setObservation('');
        } else {
            alert('Please fill out both fields before submitting.');
        }
    };

    const handleDelete = (index: number) => {
        const updatedObservations = observations.filter((_, i) => i !== index);
        setObservations(updatedObservations);
    };

    return (
        <Card title="Observations" className="p-shadow-5 destiny-card">
            <div className="destiny-container p-fluid">
                <div className="p-field destiny-field">
                    <label htmlFor="name" className="p-d-block">Name</label>
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-inputtext-lg p-d-block"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="p-field destiny-field">
                    <label htmlFor="observation" className="p-d-block">Observation</label>
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
                {observations.length > 0 && (
                    <div className="p-mt-3 destiny-info p-d-flex p-flex-column p-ai-center">
                        <h3 className="p-mb-2">Observations List:</h3>
                        <ul className="observation-list">
                            {observations.map((obs, index) => (
                                <li key={index} className="p-d-flex p-jc-between p-ai-center">
                                    <span className="p-text-bold">
                                        <strong>{obs.name}:</strong> {obs.text}
                                    </span>
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