import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Routers";
import MainContextProvider from "./context/MainContext";

const App: React.FC = () => {
  return(
    <MainContextProvider>
     <RouterProvider router={Router} />
    </MainContextProvider>
  )
};

export default App;
