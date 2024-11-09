import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import 'src/styles/TripPlan/Activities.scss'; // Import custom CSS
import { useStateTogether } from 'react-together';

interface Activity {
    name: string;
    duration: number;
    cost: number;
    effort: string;
}

const Activities: React.FC = () => {
    const [activityName, setActivityName] = useState('');
    const [duration, setDuration] = useState<number | null>(null);
    const [cost, setCost] = useState<number | null>(null);
    const [effort, setEffort] = useState('');
    const [activities, setActivities] = useStateTogether<Activity[]>('activities', []);
    
    const effortOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Moderate', value: 'Moderate' },
        { label: 'High', value: 'High' }
    ];

    const handleSubmit = () => {
        if (activityName.trim() && duration !== null && cost !== null && effort) {
            const newActivity: Activity = { name: activityName.trim(), duration, cost, effort };
            setActivities([...activities, newActivity]);
            setActivityName('');
            setDuration(null);
            setCost(null);
            setEffort('');
        } else {
            alert('Please fill out all fields before submitting.');
        }
    };

    const handleDelete = (index: number) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
    };

    return (
        <Card title="Activities" className="p-shadow-5 " style={{ marginBottom: '1rem' }}>
            <div className="destiny-container p-fluid">
                {/* Activity Name */}
                <div className="p-field destiny-field">
                    <label htmlFor="activityName" className="p-d-block">Activity Name</label>
                    <InputText
                        id="activityName"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        className="p-inputtext-lg p-d-block"
                        placeholder="Enter activity name"
                    />
                </div>

                {/* Activity Duration */}
                <div className="p-field destiny-field">
                    <label htmlFor="duration" className="p-d-block">Duration (hours)</label>
                    <InputNumber
                        id="duration"
                        value={duration}
                        onValueChange={(e) => setDuration(e.value)}
                        className="p-inputtext-lg p-d-block"
                        placeholder="Enter duration"
                    />
                </div>

                {/* Activity Cost */}
                <div className="p-field destiny-field">
                    <label htmlFor="cost" className="p-d-block">Cost ($)</label>
                    <InputNumber
                        id="cost"
                        value={cost}
                        onValueChange={(e) => setCost(e.value)}
                        className="p-inputtext-lg p-d-block"
                        placeholder="Enter cost"
                        mode="currency"
                        currency="USD"
                    />
                </div>

                {/* Effort Level */}
                <div className="p-field destiny-field">
                    <label htmlFor="effort" className="p-d-block">Effort Level</label>
                    <Dropdown
                        id="effort"
                        value={effort}
                        options={effortOptions}
                        onChange={(e) => setEffort(e.value)}
                        placeholder="Select effort level"
                        className="p-dropdown-lg p-d-block"
                    />
                </div>

                {/* Submit Button */}
                <div className="destiny-button-container p-d-flex p-jc-center p-mt-3">
                    <Button
                        label="Submit"
                        onClick={handleSubmit}
                        className="p-button-rounded p-button-primary"
                    />
                </div>

                {/* Display Activities List */}
                {activities.length > 0 && (
                    <div className="destiny-info show p-d-flex p-flex-column p-ai-center">
                        <h3 className="p-mb-2">Activities List:</h3>
                        <ul className="activity-list">
                            {activities.map((activity, index) => (
                                <li key={index} className="p-d-flex p-jc-between p-ai-center">
                                    <span className="p-text-bold">
                                        {activity.name} - {activity.duration} hrs - ${activity.cost} - Effort: {activity.effort}
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

export default Activities;
