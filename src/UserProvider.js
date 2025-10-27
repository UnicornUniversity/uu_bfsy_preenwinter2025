import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState();
  const userMap = {
    u1: {
      id: "u1",
      name: "křemílek",
    },
    u2: {
      id: "u2",
      name: "vochomůrka",
    },
    u3: {
      id: "u3",
      name: "rampušák",
    },
    u4: {
      id: "u4",
      name: "rákosníček",
    },
  };

  const value = {
    userMap,
    userList: Object.keys(userMap).map((userId) => userMap[userId]),
    loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
