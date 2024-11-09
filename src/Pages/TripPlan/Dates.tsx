import React, { useState } from 'react';
import { useStateTogether } from 'react-together';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/Dates.scss'; // Import custom CSS

const Dates = () => {
    // Store dates as strings to avoid issues with Date objects
    const [startDateString, setStartDateString] = useStateTogether<string | null>('start_date', null);
    const [endDateString, setEndDateString] = useStateTogether<string | null>('end_date', null);

    // Error message states
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [endDateError, setEndDateError] = useState<string | null>(null);

    // Convert string dates to Date objects for the Calendar component
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDate = endDateString ? new Date(endDateString) : null;

    // Function to handle start date change
    const handleStartDateChange = (e: any) => {
        const newStartDate = e.value ? new Date(e.value) : null;

        // Validate: Start date cannot be after end date
        if (newStartDate && endDate && newStartDate > endDate) {
            setStartDateError('Start date cannot be after end date');
            return; // Do not update if validation fails
        }

        // Clear error message and update state if validation passes
        setStartDateError(null);
        setStartDateString(newStartDate ? newStartDate.toISOString() : null);
    };

    // Function to handle end date change
    const handleEndDateChange = (e: any) => {
        const newEndDate = e.value ? new Date(e.value) : null;

        // Validate: End date cannot be before start date
        if (newEndDate && startDate && newEndDate < startDate) {
            setEndDateError('End date cannot be before start date');
            return; // Do not update if validation fails
        }

        // Clear error message and update state if validation passes
        setEndDateError(null);
        setEndDateString(newEndDate ? newEndDate.toISOString() : null);
    };

    // Function to reset dates
    const resetDates = () => {
        setStartDateString(null);
        setEndDateString(null);
        setStartDateError(null);
        setEndDateError(null);
    };

    return (
        <Card title="Trip Plan" className="p-shadow-5 p-mt-4 dates-card">
            <div className="dates-container">
                <div className="p-field dates-field">
                    <label htmlFor="startDate">Start Date:</label>
                    <Calendar
                        id="startDate"
                        onChange={handleStartDateChange}
                        value={startDate}
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                        showIcon
                        className="dates-calendar"
                    />
                    {startDateError && <small className="error-text">{startDateError}</small>}
                </div>
                <div className="p-field dates-field">
                    <label htmlFor="endDate">End Date:</label>
                    <Calendar
                        id="endDate"
                        onChange={handleEndDateChange}
                        value={endDate}
                        dateFormat="yy-mm-dd"
                        placeholder="YYYY-MM-DD"
                        showIcon
                        className="dates-calendar"
                    />
                    {endDateError && <small className="error-text">{endDateError}</small>}
                </div>
            </div>
            <Button label="Reset" onClick={resetDates} className="p-button-outlined p-button-danger" />
        </Card>
    );
};

export default Dates;
