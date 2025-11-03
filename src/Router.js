import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserProvider.js";

import Layout from "./layout.jsx";
import Login from "./Login.js";
import ShoppingListProvider from "./ShoppingListProvider.js";
import ShoppingListDetail from "./ShoppingListDetail.js";

function Router() {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!loggedInUser && pathname !== "/login") {
      navigate(`/login?origin=${pathname}`);
    } else if (loggedInUser && pathname === "/login") {
      navigate(`/shoppingListDetail`);
    }
  }, [loggedInUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>list of shopping lists</div>} />
          <Route
            path="/login"
            element={
              <div>
                <Login />
              </div>
            }
          />
          <Route
            path="/shoppingListDetail"
            element={
              <ShoppingListProvider>
                <ShoppingListDetail />
              </ShoppingListProvider>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
