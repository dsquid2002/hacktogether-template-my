import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Dates = () => {
    // Use useState for startDate and endDate
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <Card title="Trip Plan" style={{ width: '25em', margin: 'auto', marginTop: '2em' }}>
            <div className="p-field" style={{ marginBottom: '1em' }}>
                <label htmlFor="startDate">Start Date:</label>
                <Calendar 
                    id="startDate" 
                    value={startDate} 
                    onChange={(e: any) => setStartDate(e.value)} 
                    dateFormat="yy-mm-dd" 
                    placeholder="YYYY-MM-DD" 
                    showIcon
                />
            </div>
            <div className="p-field">
                <label htmlFor="endDate">End Date:</label>
                <Calendar 
                    id="endDate" 
                    value={endDate} 
                    onChange={(e: any) => setEndDate(e.value)} 
                    dateFormat="yy-mm-dd" 
                    placeholder="YYYY-MM-DD" 
                    showIcon
                />
            </div>
        </Card>
    );
};

export default Dates;
