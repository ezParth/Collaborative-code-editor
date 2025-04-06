import React, { ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { UserContextProvider } from "./UserContext"
import { LanguageContextProvider } from "./LanguageContext";

interface ContextProvider{
    children: ReactNode
}

const MainContextProvider: React.FC<ContextProvider> = ({children}) => {
    return (
        <LanguageContextProvider>
        <ThemeContextProvider>
            <UserContextProvider>
                {children}
            </UserContextProvider>
        </ThemeContextProvider>
        </LanguageContextProvider>
    )
}

export default MainContextProvider
