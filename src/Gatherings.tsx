/*
    * Arranjar os inputs
    * Descobrir como arranjar uma nova pagina
    * Fazer a nova pagina
    * Melhorar a lista de gatherings ja feitos
    * */
import React from 'react';
import { useStateTogether } from 'react-together';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import styles from './styles/Gatherings/Gatherings.module.scss'; // Importando o módulo de estilos CSS


interface Gathering {
    id: string;
    name: string;
    place: string;
    address: string;
    date: string;
    time: string;
}

const Gathering: React.FC = () => {
    const [formData, setFormData] = useState<Omit<Gathering, 'id'>>({
        name: '',
        place: '',
        address: '',
        date: '',
        time: '',
    });
    const [gatherings, setGatherings] = useStateTogether<Gathering[]>('gathering_list', []);
    const [isPromptOpen, setIsPromptOpen] = useState(false);

    const deleteGathering = (id: string) => {
        setGatherings((prevList) => prevList.filter((gathering) => gathering.id !== id));
    };

    const handleAddClick = () => {
        setIsPromptOpen(true);
    };

    const handleOkClick = () => {
        if (validateFormData()) {
            const newGathering = { ...formData, id: `${Date.now()}-${Math.floor(Math.random() * 1000)}` };
            setGatherings((prevList) => [...prevList, newGathering]);
            resetFormData();
            setIsPromptOpen(false);
        }
    };

    const handleCancelClick = () => {
        resetFormData();
        setIsPromptOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateFormData = () => {
        return Object.values(formData).every((value) => value.trim() !== '');
    };

    const resetFormData = () => {
        setFormData({ name: '', place: '', address: '', date: '', time: '' });
    };

    return (
        <div className={styles['app-container']}>
            <nav className={styles.navbar}>
                <h1>Our Gatherings List</h1>
            </nav>
            <div className={styles['create-list-section']}>
                <Button
                    label="ADD"
                    icon="pi"
                    onClick={handleAddClick}
                    disabled={isPromptOpen}
                    className={`${styles['roundedButton']} p-button-text p-button-sm`}
                />

            </div>
            <Card className={"p-shadow-5"} style={{ marginBottom: '1rem', width: '60%' }}>
                <h2 className={styles.cardTitle}>Gatherings</h2>
                {isPromptOpen && (
                    <div className={styles['cardTitleContainer']}>
                        <div className={styles.inputFields}>
                            <input
                                type="text"
                                value={formData.name}
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={styles.inputField}
                            />
                            <input
                                type="text"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                placeholder="Enter the place's name"
                                className={styles.inputField}
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter the address"
                                className={styles.inputField}
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Enter the date"
                                className={styles.inputField}
                            />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="Enter the time"
                                className={styles.inputField}
                            />
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                onClick={handleCancelClick}
                                className="p-button-outlined p-button-danger"
                            />
                            <Button
                                label="Ok"
                                icon="pi pi-check"
                                onClick={handleOkClick}
                                className="p-button-outlined p-button-success"
                            />
                        </div>
                    </div>
                )}
                <div className={styles['lists-container']}>
                    {gatherings.length === 0 ? (
                        <p className="p-text-center p-text-muted" style={{}}>No gatherings added</p>
                    ) : (
                        gatherings.map((item) => (
                            <div key={item.id} className={styles['list-card']} >
                                <Card className="p-shadow-5" style={{ marginBottom: '1rem' }}>
                                    <div className={styles['cardTitleContainer']}>
                                        <h2 className={styles['cardTitle']}>
                                            {item.name}
                                        </h2>
                                        <Button
                                            label="Delete"
                                            icon="pi pi-trash"
                                            className={styles['deleteButton']}
                                            onClick={() => deleteGathering(item.id)}
                                        />
                                    </div>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Gathering;
