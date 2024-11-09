import React from 'react';
import Dates from './Dates';
import Destiny from './Destiny';
import Transports from './Transports';
import Accomodation from './Accomodation';
import AddPeople from './AddPeople';
import Observations from './Observations';
import Activities from './Activities';

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
          flex: 6,  // 70% of available width
          padding: '20px',
          overflowY: 'scroll',  // Enables scrolling
          maxHeight: '100vh', // Ensures content doesn't overflow beyond the viewport
          borderRight: '2px solid #ddd',  // Optional border for separation
        }}
        className="scroll-container"
      >
        <p>Trip Planner</p>
        <div style={{ marginBottom: '10px' }}></div>
        <Dates />
        <div style={{ marginBottom: '10px' }}></div>
        <Destiny />
        <div style={{ marginBottom: '10px' }}></div>
        <Transports />
        <div style={{ marginBottom: '10px' }}></div>
        <Accomodation />
        <div style={{ marginBottom: '10px' }}></div>
        <Activities />
      </div>

      {/* Right Section (30%) for AddPeople */}
      <div
        style={{
          flex: 4,  // 30% of available width
          padding: '20px',
          overflowY: 'scroll', // Enables scrolling
        }}
        className="scroll-container"
      >
        <AddPeople id={1} name="Who's Joining?" onDelete={handleDelete} />
        <div style={{ marginBottom: '10px' }}></div>
        <Observations />
      </div>

      <style>
        {`
          /* Hide scrollbar but keep it scrollable */
          .scroll-container::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }

          .scroll-container {
            overflow-y: scroll; /* Keeps the scrollable area */
          }
        `}
      </style>
    </div>
  );
};

export default App;
