// SessionInitializer.tsx
import React from 'react';
import { ReactTogether } from 'react-together';
import ShoppingListLandingPage from '../ShoppingList/ShoppingListLandingPage';
import TripLandingPage from '../TripPlan/TripPlan'; // Assume this component exists

interface SessionInitializerProps {
  sessionName: string;
  sessionPassword: string;
  sessionType: string; // Possible values: 'shopping', 'trip', 'gathering'
}

const SessionInitializer: React.FC<SessionInitializerProps> = ({ sessionName, sessionPassword, sessionType }) => {
  const renderLandingPage = () => {
    switch (sessionType) {
      case 'shopping':
        return <ShoppingListLandingPage sessionName={sessionName} sessionPassword={sessionPassword} />;
      case 'trip':
        return <TripLandingPage sessionName={sessionName} sessionPassword={sessionPassword} />;
      default:
        return <div>Invalid session type</div>;
    }
  };

  return (
    <ReactTogether
      sessionParams={{
        appId: 'dev.reacttogether.neeti',
        apiKey: '2XpVVAOQynrrQDVb1hAxPOVptIf3Lsb747hRcRSRn4',
        name: sessionName,
        password: sessionPassword,
      }}
    >
      {renderLandingPage()}
    </ReactTogether>
  );
};

export default SessionInitializer;
