import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Routers from "./myRouters/Routers";

import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DataProvider>
          <Routers />
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
