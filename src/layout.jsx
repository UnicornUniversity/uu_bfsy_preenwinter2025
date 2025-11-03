import Container from "react-bootstrap/Container";

import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import Button from "react-bootstrap/esm/Button.js";

function Layout() {
  const { loggedInUser, userMap, setLoggedInUser } = useContext(UserContext);

  return (
    <>
      <div>
        some navigation here - -{" "}
        {loggedInUser ? userMap[loggedInUser].name : null}
        {loggedInUser ? (
          <Button
            onClick={() => setLoggedInUser()}
            size="sm"
            variant="outline-secondary"
          >
            logout
          </Button>
        ) : null}
      </div>
      <Container fluid className="p-0">
        <div className="mt-56">
          <Outlet />
        </div>
      </Container>
      <div>contact copyright ...</div>
    </>
  );
}

export default Layout;
