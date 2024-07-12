/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const RoomContext = createContext({});

export function RoomContextProvider({ children }) {
  const [room, setRoom] = useState({});
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
