import React, { useState } from 'react';
import { useStateTogether } from 'react-together';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import styles from '../../styles/ShoppingList/ShoppingList.module.scss';

interface Item {
    id: number;
    name: string;
    purchased: boolean;
    quantity: number;
    budget: number;  // Added budget property
}

interface PeopleListProps {
    id: number;
    name: string;
    onDelete: () => void;
}

const ShoppingList: React.FC<PeopleListProps> = ({ id, name, onDelete }) => {
    const [items, setItems] = useStateTogether<Item[]>(`items_${id}`, []);
    const [inputValue, setInputValue] = useState('');
    const [budgetValue, setBudgetValue] = useState<number>(0);  // State for budget value

    const addItem = () => {
        if (inputValue.trim() !== '' && budgetValue > 0) {  // Ensure budget is a positive number
            const newItem: Item = {
                id: Date.now(),
                name: inputValue,
                purchased: false,
                quantity: 1,
                budget: budgetValue, // Set the budget for the new item
            };
            setItems([...items, newItem]);
            setInputValue('');
            setBudgetValue(0);  // Reset budget field after adding item
        }
    };

    const toggleItemPurchased = (itemId: number) => {
        setItems(
            items.map((item) =>
                item.id === itemId ? { ...item, purchased: !item.purchased } : item
            )
        );
    };

    const deleteItem = (itemId: number) => {
        setItems(items.filter((item) => item.id !== itemId));
    };

    return (
        <Card className={`${styles['p-shadow-5']} ${styles['card']}`} style={{ marginBottom: '1rem' }}>
            {/* Title and Delete Button Container */}
            <div className={styles['cardTitleContainer']}>
                <h2 className={styles['cardTitle']}>{name}</h2>
            </div>

            {/* Add Item Input Group */}
            <div className={`p-inputgroup ${styles['inputGroup']}`}>
                <InputText
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a person"
                />
                <InputText
                    type="number"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(parseInt(e.target.value, 10))}
                    placeholder="€"  // Placeholder with euro symbol
                    min={1}
                />
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    onClick={addItem}
                    className={`${styles['roundedButton']} p-button-rounded p-button-primary`}
                />
            </div>
            <Divider />

            {/* Shopping List Items */}
            <div className={styles['shoppingListItems']} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {items.length === 0 ? (
                    <p className="p-text-center p-text-muted">No items added</p>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className={`${styles['shoppingListItem']} ${item.purchased ? styles['purchased'] : ''}`}>
                            <div className={styles['itemDetails']}>
                                <span
                                    className={styles['itemName']}
                                    onClick={() => toggleItemPurchased(item.id)}
                                >
                                    {item.name}
                                </span>

                                {/* Budget Section */}
                                <div className={styles['quantityControls']}>
                                    <span className={styles['quantityTitle']}>Budget: </span>
                                    <span className={styles['quantityValue']}>{item.budget}€</span>
                                </div>
                            </div>
                            <Button
                                icon="pi pi-times"
                                className={`${styles['iconOnlyRemoveButton']} p-button-text p-button-plain`}
                                onClick={() => deleteItem(item.id)}
                            />
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default ShoppingList;
