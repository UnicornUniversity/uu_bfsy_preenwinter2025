import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { UserContext } from "./UserProvider.js";

export const ShoppingListsContext = createContext();

function ShoppingListsProvider({ children }) {
  const { authUser } = useContext(UserContext);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [isLoadingLists, setIsLoadingLists] = useState(false);

  function createShoppingList({ name }) {
    if (!authUser?.id) {
      throw new Error("You must be logged in to create a shopping list");
    }

    const newList = {
      id: String(Date.now()),
      name: name.trim(),
      owner: String(authUser.id),
      memberList: [],
      itemList: [],
      archived: false,
    };

    setShoppingLists((prev) => [...prev, newList]);
    return newList;
  }

  function archiveShoppingList({ listId }) {
    if (!authUser?.id) {
      throw new Error("You must be logged in to archive a shopping list");
    }

    setShoppingLists((prev) =>
      prev.map((list) => {
        if (String(list.id) === String(listId)) {
          if (String(list.owner) !== String(authUser.id)) {
            throw new Error("Only the owner can archive a shopping list");
          }
          return { ...list, archived: true };
        }
        return list;
      })
    );
  }

  function unarchiveShoppingList({ listId }) {
    if (!authUser?.id) {
      throw new Error("You must be logged in to unarchive a shopping list");
    }

    setShoppingLists((prev) =>
      prev.map((list) => {
        if (String(list.id) === String(listId)) {
          if (String(list.owner) !== String(authUser.id)) {
            throw new Error("Only the owner can unarchive a shopping list");
          }
          return { ...list, archived: false };
        }
        return list;
      })
    );
  }

  const fetchShoppingLists = useCallback(async () => {
    if (!authUser?.id) {
      setShoppingLists([]);
      return;
    }

    setIsLoadingLists(true);
    try {
      // Simulate real fetch with 1s delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/data/shoppingLists.json");
      const data = await response.json();

      // Filter shopping lists where authUser is owner or member
      // Add archived: false to lists that don't have it (for backward compatibility)
      const userId = String(authUser.id);
      const filteredLists = data
        .filter(
          (list) =>
            String(list.owner) === userId ||
            list.memberList.some((memberId) => String(memberId) === userId)
        )
        .map((list) => ({
          ...list,
          archived: list.archived ?? false,
        }));
      setShoppingLists(filteredLists);
    } catch (error) {
      console.error("Error fetching shopping lists:", error);
      setShoppingLists([]);
    } finally {
      setIsLoadingLists(false);
    }
  }, [authUser]);

  useEffect(() => {
    fetchShoppingLists();
  }, [fetchShoppingLists, authUser?.id]);

  const value = {
    shoppingLists,
    isLoadingLists,
    fetchShoppingLists,
    createShoppingList,
    archiveShoppingList,
    unarchiveShoppingList,
  };

  return (
    <ShoppingListsContext.Provider value={value}>
      {children}
    </ShoppingListsContext.Provider>
  );
}

export default ShoppingListsProvider;
