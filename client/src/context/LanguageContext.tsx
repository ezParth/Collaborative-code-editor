import React, { createContext, ReactNode, useState } from "react";
// import { MonacoEditorLanguages } from "../config/MonacoLanguages"

interface languageContextType {
    editorlanguages: string;
    setEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const defaultLanguageValue: string = "JavaScript";

export const languageContext = createContext<languageContextType>({
    editorlanguages: "javascript",
    setEditorLanguage: () => {},
});

interface languageContextProviderType {
    children: ReactNode;
}

export const LanguageContextProvider: React.FC<languageContextProviderType> = ({ children }) => {
    const [editorlanguages, setEditorLanguage] = useState<string>(defaultLanguageValue);

    return (
        <languageContext.Provider value={{ editorlanguages, setEditorLanguage }}>
            {children}
        </languageContext.Provider>
    );
};
