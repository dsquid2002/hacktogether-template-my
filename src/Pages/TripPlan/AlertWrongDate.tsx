import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AlertWrongDate: React.FC<{ visible: boolean; onHide: () => void; message: string }> = ({ visible, onHide, message }) => {
    return (
        <Dialog header="Alert" visible={visible} style={{ width: '50vw' }} onHide={onHide} className="p-dialog-blue">
            <p>{message}</p>
            <Button label="OK" onClick={onHide} />
        </Dialog>
    );
};

export default AlertWrongDate;
