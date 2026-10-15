import React from 'react';
import { DemoModeProvider } from './context/DemoModeContext';
import UserHub from './features/users/UserHub';

export default function App() {
  return (
    <DemoModeProvider>
      <main style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Painel de Gestão de Estudantes</h1>
        <UserHub />
      </main>
    </DemoModeProvider>
  );
}
