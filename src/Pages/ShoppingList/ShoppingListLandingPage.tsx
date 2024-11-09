import React from 'react';
import ShoppingList from './ShoppingList';

const App: React.FC = () => {
  return (
    <div>
      <ShoppingList id={1} name="Groceries" />
      <ShoppingList id={2} name="Household Supplies" />
    </div>
  );
};

export default App;