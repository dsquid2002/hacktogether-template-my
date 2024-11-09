import React from 'react';
import Dates from './Dates';
import Destiny from './Destiny';
import Transports from './Transports';
import Accomodation from './Accomodation';
import AddPeople from './AddPeople';

const App: React.FC = () => {
  // A simple onDelete function that will log a message to the console
  const handleDelete = () => {
    console.log('Delete action triggered for the shopping list');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Section (70%) for Dates, Destiny, Transports, Accomodation */}
      <div
        style={{
          flex: 7,  // 70% of available width
          padding: '20px',
          overflowY: 'hidden',  // Disables vertical scrolling
          borderRight: '2px solid #ddd',  // Optional border for separation
        }}
      >
        <Dates />
        <div style={{ marginBottom: '10px' }}></div>
        <Destiny />
        <div style={{ marginBottom: '10px' }}></div>
        <Transports />
        <div style={{ marginBottom: '10px' }}></div>
        <Accomodation />
      </div>

      {/* Right Section (30%) for AddPeople */}
      <div
        style={{
          flex: 3,  // 30% of available width
          padding: '20px',
          overflowY: 'hidden', // Disables vertical scrolling
        }}
      >
        <AddPeople id={1} name="Who's Joining?" onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
