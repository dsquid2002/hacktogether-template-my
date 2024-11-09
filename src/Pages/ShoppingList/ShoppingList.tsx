import React, { useState } from 'react';
import { useStateTogether } from 'react-together';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import styles from '../../styles/ShoppingList/ShoppingList.module.scss';

interface Item {
  id: number;
  name: string;
  purchased: boolean;
  quantity: number;
}

interface ShoppingListProps {
  id: number;
  name: string;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ id, name }) => {
  const [items, setItems] = useStateTogether<Item[]>(`items_${id}`, []);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      const newItem: Item = {
        id: Date.now(),
        name: inputValue,
        purchased: false,
        quantity: 1,
      };
      setItems([...items, newItem]);
      setInputValue('');
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

  const increaseQuantity = (itemId: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <Card title={name} className="p-shadow-5" style={{ marginBottom: '1rem' }}>
      <div className={`p-inputgroup ${styles.inputGroup}`}>
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item"
        />
        <Button
          label="Add"
          icon="pi pi-plus"
          onClick={addItem}
          className="p-button-outlined p-button-success"
        />
      </div>
      <Divider />
      <div className={styles.shoppingListItems}>
        {items.length === 0 ? (
          <p className="p-text-center p-text-muted">No items added</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.shoppingListItem}>
              <div className={styles.itemDetails}>
                <Checkbox
                  checked={item.purchased}
                  onChange={() => toggleItemPurchased(item.id)}
                />
                <span
                  className={`${styles.itemName} ${item.purchased ? styles.purchased : ''}`}
                  onClick={() => toggleItemPurchased(item.id)}
                >
                  {item.name}
                </span>
                <div className={styles.quantityControls}>
                  <Button
                    icon="pi pi-minus"
                    className="p-button-rounded p-button-text p-button-sm"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  />
                  <span className={styles.quantity}>{item.quantity}</span>
                  <Button
                    icon="pi pi-plus"
                    className="p-button-rounded p-button-text p-button-sm"
                    onClick={() => increaseQuantity(item.id)}
                  />
                </div>
              </div>
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text p-button-plain"
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