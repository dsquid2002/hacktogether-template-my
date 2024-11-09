import React from 'react';
import { useStateTogether } from 'react-together';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Dates = () => {
    // Store dates as strings to avoid issues with Date objects
    const [startDateString, setStartDateString] = useStateTogether<string | null>('start_date', null);
    const [endDateString, setEndDateString] = useStateTogether<string | null>('end_date', null);

    // Convert string dates to Date objects for the Calendar component
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDate = endDateString ? new Date(endDateString) : null;

    // Function to handle start date change
    const handleStartDateChange = (e: any) => {
        const newStartDate = e.value ? new Date(e.value) : null;

        // Validate: Start date cannot be after end date
        if (newStartDate && endDate && newStartDate > endDate) {
            alert('Start date cannot be after end date');
            return; // Stop further execution if validation fails
        }

        // If validation passes, update state
        setStartDateString(newStartDate ? newStartDate.toISOString() : null);
    };

    // Function to handle end date change
    const handleEndDateChange = (e: any) => {
        const newEndDate = e.value ? new Date(e.value) : null;

        // Validate: End date cannot be before start date
        if (newEndDate && startDate && newEndDate < startDate) {
            alert('End date cannot be before start date');
            return; // Stop further execution if validation fails
        }

        // If validation passes, update state
        setEndDateString(newEndDate ? newEndDate.toISOString() : null);
    };

    return (
        <Card title="Trip Plan" style={{ width: '25em', margin: 'auto', marginTop: '2em' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="p-field" style={{ marginRight: '1em' }}>
                    <label htmlFor="startDate">Start Date:</label>
                    <Calendar
                        id="startDate"
                        onChange={handleStartDateChange}
                        value={startDate}
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                        showIcon
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="endDate">End Date:</label>
                    <Calendar
                        id="endDate"
                        onChange={handleEndDateChange}
                        value={endDate}
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                        showIcon
                    />
                </div>
            </div>
        </Card>
    );
};

export default Dates;
