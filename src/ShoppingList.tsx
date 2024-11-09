import React from 'react';
import { useStateTogether } from 'react-together';
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

const ShoppingList: React.FC = () => {
  const [items, setItems] = useStateTogether<Item[]>('shared_items', []);
  const [inputValue, setInputValue] = useStateTogether<string>('input_value', '');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      const newItem: Item = {
        id: Date.now(),
        name: inputValue,
        purchased: false,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const toggleItemPurchased = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.shoppingListContainer}>
      <Card title="Shared Shopping List" className="p-shadow-5">
        <div className={`p-inputgroup ${styles.inputGroup}`}>
          <InputText
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter an item"
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
              <div
                key={item.id}
                className={styles.shoppingListItem}
              >
                <div className="p-d-flex p-ai-center">
                  <Checkbox
                    checked={item.purchased}
                    onChange={() => toggleItemPurchased(item.id)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span
                    className={`${styles.itemName} ${item.purchased ? styles.purchased : ''}`}
                    onClick={() => toggleItemPurchased(item.id)}
                  >
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
