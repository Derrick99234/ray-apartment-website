import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { CompanyContextProvider } from "./context/companyContext.jsx";
import { RoomContextProvider } from "./context/roomContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CompanyContextProvider>
        <RoomContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RoomContextProvider>
      </CompanyContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
