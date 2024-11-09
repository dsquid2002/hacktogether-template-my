import React from 'react';
import { useStateTogether } from 'react-together';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';

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
    <div className="p-d-flex p-jc-center p-mt-5">
      <Card title="Shared Shopping List" className="p-shadow-5" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="p-inputgroup" style={{ marginBottom: '1rem' }}>
          <InputText
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter an item"
            style={{ flex: 1, padding: '0.75rem' }}
          />
          <Button
            label="Add"
            icon="pi pi-plus"
            onClick={addItem}
            className="p-button-outlined p-button-success"
          />
        </div>
        <Divider />
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {items.length === 0 ? (
            <p className="p-text-center p-text-muted" style={{ margin: '1rem 0' }}>No items added</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-d-flex p-ai-center p-jc-between"
                style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <div className="p-d-flex p-ai-center">
                  <Checkbox
                    checked={item.purchased}
                    onChange={() => toggleItemPurchased(item.id)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span
                    style={{
                      textDecoration: item.purchased ? 'line-through' : 'none',
                      color: item.purchased ? '#999' : '#333',
                      fontSize: '1rem',
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-text p-button-plain"
                  onClick={() => deleteItem(item.id)}
                  style={{ color: '#999' }}
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
