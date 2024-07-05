/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CompanyContext = createContext({});

export function CompanyContextProvider({ children }) {
  const [company, setCompany] = useState({});
  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
