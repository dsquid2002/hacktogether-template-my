// ShoppingListSessionInitializer.tsx
import React from 'react';
import { ReactTogether } from 'react-together';
import ShoppingListLandingPage from './ShoppingListLandingPage';

interface ShoppingListSessionInitializerProps {
  sessionName: string;
  sessionPassword: string;
}

const ShoppingListSessionInitializer: React.FC<ShoppingListSessionInitializerProps> = ({ sessionName, sessionPassword }) => {
  return (
    <ReactTogether
      sessionParams={{
        appId: 'dev.reacttogether.neeti1',
        apiKey: '2XpVVAOQynrrQDVb1hAxPOVptIf3Lsb747hRcRSRn4',
        name: sessionName,
        password: sessionPassword,
      }}
    >
      <ShoppingListLandingPage sessionName={sessionName} sessionPassword={sessionPassword} />
    </ReactTogether>
  );
};

export default ShoppingListSessionInitializer;
