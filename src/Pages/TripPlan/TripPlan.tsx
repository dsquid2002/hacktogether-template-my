import React from 'react';
import Dates from './Dates';
import Destiny from './Destiny';
import Transports from './Transports';
import Accomodation from './Accomodation';

const App: React.FC = () => {
  return (
    <div>
      <Dates />
      <div style={{ marginBottom: '10px' }}></div>
      <Destiny />
      <div style={{ marginBottom: '10px' }}></div>
      <Transports/>
      <div style={{ marginBottom: '10px' }}></div>
      <Accomodation/>
    </div>
  );
};

export default App;