// SessionJoiner.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SessionInitializer from './SessionInitializer';
import styles from './SessionJoiner.module.scss'

const SessionJoiner: React.FC = () => {
  const { plannerType } = useParams<{ plannerType: string }>(); // Get plannerType from the URL
  const [sessionName, setSessionName] = useState('');
  const [sessionPassword, setSessionPassword] = useState('');
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const generateRandomSessionName = () => `session_${Math.random().toString(36).substr(2, 9)}`;
  const generateRandomPassword = () => Math.random().toString(36).substr(2, 9);

  const handleStartSession = () => {
    if (sessionName.trim() && sessionPassword.trim()) {
      setIsSessionStarted(true);
    } else {
      alert('Please enter both a session name and a password.');
    }
  };

  const handleStartRandomSession = () => {
    setSessionName(generateRandomSessionName());
    setSessionPassword(generateRandomPassword());
    setIsSessionStarted(true);
  };

  return (
    <div className={styles['app-container']}>
      {!isSessionStarted ? (
        <div className={styles['session-inputs']}>
          <h2>Create or Join a Session for {plannerType}</h2>
          <div className={styles['input-group']}>
            <InputText
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="Enter session name"
            />
          </div>
          <div className={styles['input-group']}>
            <InputText
              type="password"
              value={sessionPassword}
              onChange={(e) => setSessionPassword(e.target.value)}
              placeholder="Enter session password"
            />
          </div>
          <div className={styles['button-group']}>
            <Button label="Start Session" onClick={handleStartSession} className="p-button" />
            <Button
              label="Random Session"
              onClick={handleStartRandomSession}
              className="p-button p-button-secondary"
            />
          </div>
        </div>
      ) : (
        <SessionInitializer
          sessionName={sessionName}
          sessionPassword={sessionPassword}
          sessionType={plannerType || ''}
        />
      )}
    </div>
  );
};

export default SessionJoiner;
