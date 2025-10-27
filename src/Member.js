import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";

function Member({ memberId, ownerId }) {
  const { userMap, loggedInUser } = useContext(UserContext);
  const { handlerMap } = useContext(ShoppingListContext);

  return (
    <div>
      {userMap[memberId].name}{" "}
      {memberId !== ownerId &&
      (loggedInUser === ownerId || loggedInUser === memberId) ? (
        <button onClick={() => handlerMap.removeMember({ memberId })}>x</button>
      ) : null}
    </div>
  );
}

export default Member;
