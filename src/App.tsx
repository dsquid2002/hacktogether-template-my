// App.tsx
import React, { useState } from 'react';
import ShoppingListSessionJoiner from './Pages/ShoppingList/ShoppingListSessionJoiner';

const App: React.FC = () => {
  const [plannerType, setPlannerType] = useState<string | null>(null);

  const renderPlanner = () => {
    switch (plannerType) {
      case 'shopping':
        return <ShoppingListSessionJoiner />;
      default:
        return (
          <div>
            <h1>Select a Planner</h1>
            <button onClick={() => setPlannerType('shopping')}>Shopping List</button>
            <button onClick={() => setPlannerType('trip')}>Trip Planner</button>
            <button onClick={() => setPlannerType('gathering')}>Gathering Planner</button>
          </div>
        );
    }
  };

  return <div>{renderPlanner()}</div>;
};

export default App;
