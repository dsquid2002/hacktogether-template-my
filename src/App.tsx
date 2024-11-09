import React from 'react';
import { useStateTogether } from 'react-together';

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
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Shared Shopping List</h2>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new item"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addItem} style={{ marginLeft: '10px', padding: '8px' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: item.purchased ? '#d3ffd3' : '#ffdede',
              borderRadius: '5px',
            }}
          >
            <span
              style={{
                textDecoration: item.purchased ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleItemPurchased(item.id)}
            >
              {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)} style={{ padding: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;