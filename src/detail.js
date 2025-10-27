import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import Login from "./login.js";
import ShoppingListProvider from "./ShoppingListProvider.js";
import MemberList from "./MemberList.js";

function Detail() {
  const { loggedInUser, userMap, setLoggedInUser } = useContext(UserContext);

  return (
    <div>
      {loggedInUser ? (
        <ShoppingListProvider>
          <div>
            Header - {userMap[loggedInUser].name} -{" "}
            <button onClick={() => setLoggedInUser()}>logout</button>
          </div>
          <div>ShoppingList name</div>
          <MemberList />
        </ShoppingListProvider>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Detail;
