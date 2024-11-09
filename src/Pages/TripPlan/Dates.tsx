import React from 'react';
import { useStateTogether } from 'react-together';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Dates = () => {
    // Armazenando as datas como strings para evitar possíveis problemas com objetos Date
    const [startDateString, setStartDateString] = useStateTogether<string | null>('start_date', null);
    const [endDateString, setEndDateString] = useStateTogether<string | null>('end_date', null);

    // Converte strings para objetos Date ao usar no componente Calendar
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDate = endDateString ? new Date(endDateString) : null;

    // Funções de atualização convertendo Date para string antes de armazenar
    const handleStartDateChange = (e: any) => {
        setStartDateString(e.value ? e.value.toISOString() : null);
    };

    const handleEndDateChange = (e: any) => {
        setEndDateString(e.value ? e.value.toISOString() : null);
    };

    return (
        <Card title="Trip Plan" style={{ width: '25em', margin: 'auto', marginTop: '2em' }}>
            <div className="p-field" style={{ marginBottom: '1em' }}>
                <label htmlFor="startDate">Start Date:</label>
                <Calendar 
                    id="startDate" 
                    value={startDate} 
                    onChange={handleStartDateChange} 
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
                    onChange={handleEndDateChange} 
                    dateFormat="yy-mm-dd" 
                    placeholder="YYYY-MM-DD" 
                    showIcon
                />
            </div>
        </Card>
    );
};

export default Dates;