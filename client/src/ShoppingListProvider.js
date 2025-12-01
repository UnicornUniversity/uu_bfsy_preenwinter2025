import { createContext, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const ShoppingListContext = createContext();

function ShoppingListProvider({ children }) {
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("id");

  const useMock = process.env.REACT_APP_USE_MOCK_DATA === "true";
  console.log(
    "env REACT_APP_USE_MOCK_DATA:",
    process.env.REACT_APP_USE_MOCK_DATA,
    "useMock:",
    useMock
  );

  const [shoppingList, setShoppingList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShoppingList = useCallback(async () => {
    if (!listId) {
      setShoppingList(null);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate real fetch with 1s delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/data/shoppingLists.json");
      const data = await response.json();
      const foundList = data.find((list) => String(list.id) === String(listId));
      setShoppingList(foundList || null);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
      setShoppingList(null);
    } finally {
      setIsLoading(false);
    }
  }, [listId]);

  useEffect(() => {
    fetchShoppingList();
  }, [fetchShoppingList]);

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
    isLoading,
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
