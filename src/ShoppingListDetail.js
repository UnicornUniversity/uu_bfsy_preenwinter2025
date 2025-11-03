import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";

import MemberList from "./MemberList";

function ShoppingListDetail(props) {
  const { loggedInUser } = useContext(UserContext);
  const { shoppingList } = useContext(ShoppingListContext);

  return (
    <div>
      <div>
        {shoppingList.name}{" "}
        {shoppingList.owner === loggedInUser ? <button>u</button> : null}
      </div>
      <MemberList />
      <div>Item list</div>
    </div>
  );
}

export default ShoppingListDetail;
