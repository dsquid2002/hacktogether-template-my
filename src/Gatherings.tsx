import React from 'react';
import { useStateTogether } from 'react-together';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import styles from './styles/ShoppingList/ShoppingList.module.scss'; // Import the CSS module

interface Item {
    id: number;
    name: string;
    purchased: boolean;
}

interface FormData {
    id: string;
    name: string;
    place: string;
    address: string;
    date: string;
    time: string;
}

const ShoppingList: React.FC = () => {
    const [items, setItems] = useStateTogether<Item[]>('shared_items', []);
    const [inputValue, setInputValue] = useStateTogether<string>('input_value', '');
    const [formData, setFormData] = useState<Omit<FormData, 'id'>>({
        name: '',
        place: '',
        address: '',
        date: '',
        time: '',
    });
    const [formDataList, setFormDataList] = useStateTogether<FormData[]>('form_data_list', []);
    const [isPromptOpen, setIsDisabled] = useState(false);

    const deleteItem = (id: string) => {
        setFormDataList((prevList) => prevList.filter((item) => item.id !== id));
    };

    const handleAddClick = () => {
        console.log('formData', formData);
        setFormData({
            name: '',
            place: '',
            address: '',
            date: '',
            time: '',
        });
        setIsDisabled(!isPromptOpen);
    }

    const handleOkClick = () => {
        validate();
        console.log('formData', formData);
    }

    const handleCancelClick = () => {
        console.log('formData', formData);
        setIsDisabled(!isPromptOpen);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const validate = () => {
        if (!formData.name.trim() || !formData.place.trim() || !formData.address.trim() || !formData.date.trim() || !formData.time.trim()) {
            setIsDisabled(isPromptOpen);
        } else {
            const newFormData = {
                ...formData,
                id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            };
            setFormDataList((prevlist) => [...prevlist, newFormData]);
            setIsDisabled(!isPromptOpen);
        }
    }

    return (
        <div className={styles.shoppingListContainer}>
            <Card title="Shared Gatherings List" className="p-shadow-5">
                <div className={`p-inputgroup ${styles.inputGroup}`}>
                    <Button
                        label="Add"
                        icon="pi pi-plus"
                        onClick={handleAddClick}
                        disabled={isPromptOpen}
                        className="p-button-outlined p-button-success"
                    />
                    {isPromptOpen && (
                        <>
                            <input
                                type="text"
                                value={formData.name}
                                name='name'
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                            <input
                                type="text"
                                name='place'
                                value={formData.place}
                                onChange={handleChange}
                                placeholder="Enter the place's name"
                            />
                            <input
                                type="text"
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter the address of the place"
                            />
                            <input
                                type="text"
                                name='date'
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Enter the date of the gathering"
                            />
                            <input
                                type="text"
                                name='time'
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="Enter the time of the gathering"
                            />
                            <Button
                                label="Cancel"
                                icon="pi pi-plus"
                                onClick={handleCancelClick}
                                disabled={!isPromptOpen}
                                className="p-button-outlined p-button-success"
                            />
                            <Button
                                label="Ok"
                                icon="pi pi-plus"
                                onClick={handleOkClick}
                                disabled={!isPromptOpen}
                                className="p-button-outlined p-button-success"
                            />
                        </>
                    )}
                </div>
                <Divider />
                <div className={styles.shoppingListItems}>
                    {formDataList.length === 0 ? (
                        <p className="p-text-center p-text-muted">No items added</p>
                    ) : (
                        formDataList.map((item) => (
                            <div
                                key={item.id}
                                className={styles.shoppingListItem}
                            >
                                <div className="p-d-flex p-ai-center">
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-text p-button-plain"
                                    onClick={() => deleteItem(item.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ShoppingList;

