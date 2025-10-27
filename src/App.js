import "./App.css";
import Detail from "./detail";
import UserProvider from "./UserProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Detail />
      </UserProvider>
    </div>
  );
}

export default App;
