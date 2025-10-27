import { useContext } from "react";
import Member from "./Member.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";

function MemberList() {
  const { shoppingList } = useContext(ShoppingListContext);

  return (
    <div>
      <div>
        <Member memberId={shoppingList.owner} ownerId={shoppingList.owner} />
      </div>
      {shoppingList.memberList.map((memberId) => (
        <Member memberId={memberId} ownerId={shoppingList.owner} />
      ))}
    </div>
  );
}

export default MemberList;
