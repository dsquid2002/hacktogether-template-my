import React, { useState } from 'react';
import { useStateTogether } from 'react-together';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { FaTrash, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
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
  const [inputValue, setInputValue] = useState<string>(''); 

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
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <Card className="p-shadow-5" style={{ marginBottom: '1rem' }}>
      <div className={styles['cardTitleContainer']}>
        <h2 className={styles['cardTitle']}>{name}</h2>
        <button
          className={styles['deleteButton']}
          onClick={onDelete}
        >
          <FaTrash /> Delete List
        </button>
      </div>

      <div className={`p-inputgroup ${styles['inputGroup']}`}>
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item"
        />
        <button onClick={addItem} className={styles['roundedButton']}>
          <FaPlus /> Add
        </button>
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
                  <button
                    className={`${styles['iconOnlyButton']} p-button-text p-button-sm`}
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className={styles['quantity']}>{item.quantity}</span>
                  <button
                    className={`${styles['iconOnlyButton']} p-button-text p-button-sm`}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className={`${styles['iconOnlyRemoveButton']} p-button-text p-button-plain`}
                onClick={() => deleteItem(item.id)}
              >
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default ShoppingList;
