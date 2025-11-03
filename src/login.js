import { useContext } from "react";
import { UserContext } from "./UserProvider.js";

import Button from "react-bootstrap/Button";

function Login() {
  const { userList, setLoggedInUser } = useContext(UserContext);

  return (
    <div>
      {userList.map((user) => (
        <Button onClick={() => setLoggedInUser(user.id)}>{user.name}</Button>
      ))}
    </div>
  );
}

export default Login;
