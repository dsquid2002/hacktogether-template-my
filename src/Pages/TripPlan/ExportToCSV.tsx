import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'src/styles/TripPlan/ExportToCSV.scss'; // Assuming this CSS file contains the custom styles

const ExportToCSV: React.FC = () => {
    const data = [
        { name: 'TRIP DATA', Date: 0, Destiny: 'DATA' },
    ];

    const convertToCSV = (array: any[]) => {
        const header = Object.keys(array[0]).join(',');
        const rows = array.map(obj => Object.values(obj).join(','));
        return [header, ...rows].join('\n');
    };

    const downloadCSV = (csv: string, filename: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleExport = () => {
        const csv = convertToCSV(data);
        downloadCSV(csv, 'data.csv');
    };

    return (
        <Card
            title="Export Data"
            className="destiny-card p-shadow-5"
            style={{ marginBottom: '1rem' }}
        >
            <div className="export-container p-fluid">
                <Button
                    label="Export to CSV"
                    onClick={handleExport}
                    className="p-button-rounded p-button-primary destiny-button-container"
                />
            </div>
        </Card>
    );
};

export default ExportToCSV;
