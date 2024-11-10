import React, { useState } from 'react';
import { useStateTogether } from 'react-together';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import styles from '../../styles/ShoppingList/ShoppingList.module.scss';
import useHover from './HoveringUserList'; // Import the custom hook for hover

interface Item {
    id: number;
    name: string;
    purchased: boolean;
    quantity: number;
    budget: number;
}

interface PeopleListProps {
    id: number;
    name: string;
    onDelete: () => void;
}

const ShoppingList: React.FC<PeopleListProps> = ({ id, name, onDelete }) => {
    const [items, setItems] = useStateTogether<Item[]>(`items_${id}`, []);
    const [inputValue, setInputValue] = useState('');
    const [budgetValue, setBudgetValue] = useState<number>(0);

    // Hover hooks for item and buttons
    const { isHovered: isCardHovered, onMouseEnter: onCardMouseEnter, onMouseLeave: onCardMouseLeave } = useHover();
    const { isHovered: isItemHovered, onMouseEnter: onItemMouseEnter, onMouseLeave: onItemMouseLeave } = useHover();
    const { isHovered: isAddButtonHovered, onMouseEnter: onAddButtonMouseEnter, onMouseLeave: onAddButtonMouseLeave } = useHover();
    const { isHovered: isDeleteButtonHovered, onMouseEnter: onDeleteButtonMouseEnter, onMouseLeave: onDeleteButtonMouseLeave } = useHover();

    const addItem = () => {
        if (inputValue.trim() !== '' && budgetValue > 0) {
            const newItem: Item = {
                id: Date.now(),
                name: inputValue,
                purchased: false,
                quantity: 1,
                budget: budgetValue,
            };
            setItems([...items, newItem]);
            setInputValue('');
            setBudgetValue(0);
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
        <Card
            className={`${styles['p-shadow-5']} ${styles['card']} ${isCardHovered ? styles['hovered-card'] : ''}`} // Apply hover effect to the card
            style={{ marginBottom: '1rem' }}
            onMouseEnter={onCardMouseEnter} // Hover effect for the card
            onMouseLeave={onCardMouseLeave}
        >
            <div className={styles['cardTitleContainer']}>
                <h2 className={styles['cardTitle']}>{name}</h2>
            </div>

            <div className={`p-inputgroup ${styles['inputGroup']}`}>
                <InputText
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add an item"
                />
                <InputText
                    type="number"
                    onChange={(e) => setBudgetValue(parseInt(e.target.value, 10))}
                    placeholder="€"
                    min={1}
                />
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    onClick={addItem}
                    className={`${styles['roundedButton']} p-button-rounded p-button-primary`}
                    onMouseEnter={onAddButtonMouseEnter} // Add hover effect to the Add button
                    onMouseLeave={onAddButtonMouseLeave}
                    style={{
                        backgroundColor: isAddButtonHovered ? '#007bff' : '', // Change background color when hovered
                    }}
                />
            </div>
            <Divider />

            <div className={styles['shoppingListItems']} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {items.length === 0 ? (
                    <p className="p-text-center p-text-muted">No items added</p>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles['shoppingListItem']} ${item.purchased ? styles['purchased'] : ''}`}
                            onMouseEnter={onItemMouseEnter} // Hover effect for each item
                            onMouseLeave={onItemMouseLeave}
                            style={{
                                backgroundColor: isItemHovered ? '#f0f0f0' : '', // Change background color on hover
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <div className={styles['itemDetails']}>
                                <span
                                    className={styles['itemName']}
                                    onClick={() => toggleItemPurchased(item.id)}
                                >
                                    {item.name}
                                </span>

                                <div className={styles['quantityControls']}>
                                    <span className={styles['quantityTitle']}>Budget: </span>
                                    <span className={styles['quantityValue']}>{item.budget}€</span>
                                </div>
                            </div>
                            <Button
                                icon="pi pi-times"
                                className={`${styles['iconOnlyRemoveButton']} p-button-text p-button-plain`}
                                onClick={() => deleteItem(item.id)}
                                onMouseEnter={onDeleteButtonMouseEnter} // Add hover effect to the Delete button
                                onMouseLeave={onDeleteButtonMouseLeave}
                                style={{
                                    color: isDeleteButtonHovered ? '#d9534f' : '', // Change color on hover for Delete button
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default ShoppingList;
