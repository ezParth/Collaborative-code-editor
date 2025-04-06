import React, { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  editorTheme: string;
  setEditorTheme: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextThemeValue: ThemeContextType = {
    editorTheme: "vs-dark",
    setEditorTheme: () => {}
}

export const themeContext = createContext<ThemeContextType>(defaultContextThemeValue);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  return (
    <themeContext.Provider value={{ editorTheme, setEditorTheme }}>
      {children}
    </themeContext.Provider>
  );
};
