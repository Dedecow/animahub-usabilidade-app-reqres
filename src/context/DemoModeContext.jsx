import React, { createContext, useContext, useState } from 'react';

// Criação do Contexto Global para o Modo Demonstração
const DemoModeContext = createContext(undefined);

export function DemoModeProvider({ children }) {
  // Estados possíveis: 'success' | 'empty' | 'error' | 'slow'
  const [currentScenario, setCurrentScenario] = useState('success');
  
  // Define se a aplicação usa a API real da Reqres ou o Mock local
  // No Modo Demo, por defeito, usamos o mock para garantir controlo total dos cenários
  const [useRealApi, setUseRealApi] = useState(false);

  return (
    <DemoModeContext.Provider 
      value={{ 
        currentScenario, 
        setCurrentScenario, 
        useRealApi, 
        setUseRealApi 
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
}

/**
 * Hook personalizado para consumir facilmente o contexto do Demo Mode
 */
export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode deve ser usado dentro de um DemoModeProvider');
  }
  return context;
}
