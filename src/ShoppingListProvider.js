import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const [shoppingList, setShoppingList] = useState({
    id: "697859",
    name: "Shopping List 1",
    owner: "u1",
    memberList: ["u2"],
    itemList: [
      { amount: "1", name: "bread", purchased: true },
      { amount: "2 l", name: "milk", purchased: false },
      { amount: "250 g", name: "butter", purchased: true },
      { amount: "6", name: "apples", purchased: false },
    ],
  });

  function removeMember({ memberId }) {
    setShoppingList((currentValue) => {
      currentValue.memberList = currentValue.memberList.filter(
        (member) => member !== memberId
      );
      return { ...currentValue };
    });
  }

  const value = {
    shoppingList,
    setShoppingList,
    handlerMap: { removeMember },
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export default ShoppingListProvider;
