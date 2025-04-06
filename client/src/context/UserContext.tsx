import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const userContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("Guest");

  return (
    <userContext.Provider value={{ username, setUsername }}>
      {children}
    </userContext.Provider>
  );
};
