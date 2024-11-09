import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useStateTogether } from 'react-together';

const Dates = () => {
    const [startDate, setStartDate] = useStateTogether<Date | null>("start date", null);
    const [endDate, setEndDate] = useStateTogether<Date | null>("end_date", null);

    return (
        <Card title="Trip Plan" style={{ width:  '25em', margin: 'auto', marginTop: '2em' }}>
            <div className="p-field" style={{ marginBottom: '1em' }}>
                <label htmlFor="startDate">Start Date:</label>
                <Calendar 
                    id="startDate" 
                    value={startDate} 
                    onChange={(e: any) => setStartDate(e.value)} 
                    dateFormat="yy-mm-dd" 
                    placeholder="YYYY-MM-DD" 
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
                />
            </div>
        </Card>
    );
};

export default Dates;
