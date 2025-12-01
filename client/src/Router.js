import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "./UserProvider.js";

import Layout from "./Layout.js";
import Login from "./Login.js";
import ShoppingListProvider from "./ShoppingListProvider.js";
import ShoppingListsProvider from "./ShoppingListsProvider.js";
import ShoppingLists from "./ShoppingLists.js";
import ShoppingListDetail from "./ShoppingListDetail.js";

function Router() {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [searchParams, setSearchParams] = useSearchParams();

  /* eslint-disable */
  useEffect(() => {
    if (!authUser?.id && pathname !== "/login") {
      navigate(`/login?origin=${pathname}`);
    } else if (authUser?.id && pathname === "/login") {
      navigate(`/`);
    }
  }, [authUser?.id]);
  /* eslint-enable */

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ShoppingListsProvider>
                <ShoppingLists />
              </ShoppingListsProvider>
            }
          />
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
