import "./App.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserProvider";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
