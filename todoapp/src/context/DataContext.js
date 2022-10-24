import { createContext, useState } from "react";

const DataContext = createContext();
export default DataContext;

export const DataProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);

  const data = {
    todos,
    setTodos,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
