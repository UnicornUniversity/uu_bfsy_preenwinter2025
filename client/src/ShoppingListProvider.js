import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const [shoppingList, setShoppingList] = useState({
    id: "697859",
    name: "Shopping List 1",
    owner: "1",
    memberList: ["2", "3", "4"],
    itemList: [
      { amount: "1", name: "bread", purchased: true },
      { amount: "2 l", name: "milk", purchased: false },
      { amount: "250 g", name: "butter", purchased: true },
      { amount: "6", name: "apples", purchased: false },
    ],
  });

  function addMember({ memberId }) {
    setShoppingList((currentValue) => {
      const id = String(memberId);
      if (
        id &&
        id !== currentValue.owner &&
        !currentValue.memberList.includes(id)
      ) {
        currentValue.memberList = [...currentValue.memberList, id];
      }
      return { ...currentValue };
    });
  }

  function updateName({ name }) {
    const trimmed = String(name || "").trim();
    if (!trimmed) return;
    setShoppingList((currentValue) => ({ ...currentValue, name: trimmed }));
  }

  function addItem({ name, amount }) {
    const itemName = String(name || "").trim();
    const itemAmount = String(amount || "").trim();
    if (!itemName) return;
    setShoppingList((current) => ({
      ...current,
      itemList: [
        ...current.itemList,
        { name: itemName, amount: itemAmount, purchased: false },
      ],
    }));
  }

  function toggleItemPurchased({ index }) {
    setShoppingList((current) => {
      const list = current.itemList.slice();
      if (index >= 0 && index < list.length) {
        list[index] = { ...list[index], purchased: !list[index].purchased };
      }
      return { ...current, itemList: list };
    });
  }

  function removeItem({ index }) {
    setShoppingList((current) => {
      const list = current.itemList.slice();
      if (index >= 0 && index < list.length) {
        list.splice(index, 1);
      }
      return { ...current, itemList: list };
    });
  }

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
    handlerMap: {
      addMember,
      removeMember,
      updateName,
      addItem,
      toggleItemPurchased,
      removeItem,
    },
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export default ShoppingListProvider;
