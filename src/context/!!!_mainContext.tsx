import { createContext, useContext, useState, ReactNode } from 'react';

interface MainContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('');

  return (
    <MainContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};
