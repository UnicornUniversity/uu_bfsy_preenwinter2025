import { useContext } from "react";
import { UserContext } from "./UserProvider.js";

function Login() {
  const { userList, setLoggedInUser } = useContext(UserContext);

  return (
    <div>
      {userList.map((user) => (
        <div onClick={() => setLoggedInUser(user.id)}>{user.name}</div>
      ))}
    </div>
  );
}

export default Login;
