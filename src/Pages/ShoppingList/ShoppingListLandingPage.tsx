import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ShoppingList from './ShoppingList';
import styles from '../../styles/ShoppingList/ShoppingListLandingPage.module.scss';

interface List {
  id: number;
  name: string;
}

const ShoppingListLandingPage: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [newListName, setNewListName] = useState('');

  const addList = () => {
    if (newListName.trim() !== '') {
      const newList: List = {
        id: Date.now(),
        name: newListName,
      };
      setLists([...lists, newList]);
      setNewListName('');
    }
  };

  const deleteList = (id: number) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <div className={styles['app-container']}>
      {/* Navbar */}
      <nav className={styles['navbar']}>
        <h1>Our Shopping List</h1>
      </nav>

      <div className={styles['create-list-section']}>
        <InputText
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter list name"
        />
        <Button label="Add List" icon="pi pi-plus" className= {`${styles['roundedButton']} p-button-text p-button-sm`} onClick={addList} />
      </div>

      <div className={styles['lists-container']}>
        {lists.map((list) => (
          <div key={list.id} className={styles['list-card']}>
            <ShoppingList id={list.id} name={list.name} onDelete={() => deleteList(list.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingListLandingPage;
