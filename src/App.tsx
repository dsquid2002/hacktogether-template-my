
import React from 'react';
import ShoppingList from './Pages/ShoppingList/ShoppingList';

const App: React.FC = () => {
  // A simple onDelete function that will log a message to the console
  const handleDelete = () => {
    console.log('Delete action triggered for the shopping list');
  };

  return (
    <div>
      {/* Render a single ShoppingList with required props */}
      <ShoppingList
        id={1}
        name="Groceries"
        onDelete={handleDelete} // Pass the delete handler
      />
    </div>
  );
};

export default App;