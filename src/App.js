import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./my-component";

function App() {
  const shoppingListItems = [
    { amount: "1", name: "bread", purchased: true },
    { amount: "2 l", name: "milk", purchased: false },
    { amount: "250 g", name: "butter", purchased: true },
    { amount: "6", name: "apples", purchased: false },
  ];

  return (
    <div className="App">
      {shoppingListItems.map((item, index) => (
        <MyComponent item={item} index={index} />
      ))}
    </div>
  );
}

export default App;
