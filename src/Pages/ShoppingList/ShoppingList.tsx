import React from 'react';
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
}

// Define props inline instead of using ShoppingListProps interface
const ShoppingList: React.FC<{ id: number; name: string; onDelete: () => void }> = ({ id, name, onDelete }) => {
  const [items, setItems] = useStateTogether<Item[]>(`items_${id}`, []);
  const [inputValue, setInputValue] = useStateTogether<string>(`input_value_${id}`, '');

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
    <Card className="p-shadow-5" style={{ marginBottom: '1rem' }}>
      <div className={styles['cardTitleContainer']}>
        <h2 className={styles['cardTitle']}>{name}</h2>
        <Button
          label="Delete List"
          icon="pi pi-trash"
          className={styles['deleteButton']}
          onClick={onDelete}
        />
      </div>

      <div className={`p-inputgroup ${styles['inputGroup']}`}>
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item"
        />
        <Button
          label="Add"
          icon="pi pi-plus"
          onClick={addItem}
          className={styles['roundedButton']}
        />
      </div>
      <Divider />

      <div className={styles['shoppingListItems']}>
        {items.length === 0 ? (
          <p className="p-text-center p-text-muted">No items added</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles['shoppingListItem']}>
              <div className={styles['itemDetails']}>
                <label className={styles['customCheckbox']}>
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => toggleItemPurchased(item.id)}
                  />
                  <span className={styles['checkmark']}></span>
                </label>

                <span
                  className={`${styles['itemName']} ${item.purchased ? styles['purchased'] : ''}`}
                  onClick={() => toggleItemPurchased(item.id)}
                >
                  {item.name}
                </span>
                <div className={styles['quantityControls']}>
                  <Button
                    icon="pi pi-minus"
                    className={`${styles['iconOnlyButton']} p-button-text p-button-sm`}
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  />
                  <span className={styles['quantity']}>{item.quantity}</span>
                  <Button
                    icon="pi pi-plus"
                    className={`${styles['iconOnlyButton']} p-button-text p-button-sm`}
                    onClick={() => increaseQuantity(item.id)}
                  />
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
