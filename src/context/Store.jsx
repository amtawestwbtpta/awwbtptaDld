import React, { createContext, useContext, useState } from "react";
import { FirebaseProvider } from "./FirbaseContext";
const GlobalContext = createContext({
  teachersState: [],
  setTeachersState: () => [],
  deductionState: [],
  setDeductionState: () => [],
  salaryState: [],
  setSalaryState: () => [],
  indSalaryState: {
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
    january: [],
    february: [],
  },
  setIndSalaryState: () => {},
  leaveState: [],
  setLeaveState: () => [],
});
export const GlobalContextProvider = ({ children }) => {
  const [teachersState, setTeachersState] = useState([]);
  const [deductionState, setDeductionState] = useState([]);
  const [salaryState, setSalaryState] = useState([]);
  const [indSalaryState, setIndSalaryState] = useState({
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
    january: [],
    february: [],
  });
  const [leaveState, setLeaveState] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        teachersState,
        setTeachersState,
        deductionState,
        setDeductionState,
        salaryState,
        setSalaryState,
        indSalaryState,
        setIndSalaryState,
        leaveState,
        setLeaveState,
      }}
    >
      <FirebaseProvider>{children}</FirebaseProvider>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
