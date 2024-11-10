import React, { useEffect, useState } from 'react';
import { useStateTogether } from 'react-together';
import ShoppingList from './ShoppingList';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from '../../styles/ShoppingList/ShoppingListLandingPage.module.scss';

interface List {
  id: number;
  name: string;
}

interface ShoppingListLandingPageProps {
  sessionName: string;
  sessionPassword: string;
}

const ShoppingListLandingPage: React.FC<ShoppingListLandingPageProps> = ({ sessionName, sessionPassword }) => {
  const [lists, setLists] = useStateTogether<List[]>('sharedLists', []);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    console.log("Session initialized with name:", sessionName, "and password:", sessionPassword);
  }, [sessionName, sessionPassword]);

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

      {/* Create List Section */}
      <div className={styles['create-list-section']}>
        <InputText
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter list name"
          className={styles['input']}
        />
        <Button
          label="Add List"
          icon="pi pi-plus"
          onClick={addList}
          className={`${styles['roundedButton']} p-button-rounded p-button-sm`}
        />
      </div>

      {/* Lists Container */}
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
