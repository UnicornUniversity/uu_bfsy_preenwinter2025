import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiLogoutVariant } from "@mdi/js";

import { Outlet, Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserProvider.js";

function Layout() {
  const { authUser, userMap, logout } = useContext(UserContext);

  return (
    <>
      <Navbar bg="light" expand="md" className="border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <span className="me-2" aria-hidden>
              🛒
            </span>
            Shopping Lists
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/lists">
                My Lists
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-2">
              {authUser?.id ? (
                <>
                  <span className="text-muted small">
                    {userMap[authUser.id].name}
                  </span>
                  <Button
                    onClick={() => logout()}
                    size="sm"
                    variant="outline-secondary"
                  >
                    <Icon path={mdiLogoutVariant} size={0.8} className="me-1" />
                    <span className="d-none d-sm-inline">Logout</span>
                  </Button>
                </>
              ) : null}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-3">
        <Outlet />
      </Container>
      <footer className="border-top py-3 mt-auto">
        <Container>
          <span className="text-muted small">
            © {new Date().getFullYear()} Shopping Lists
          </span>
        </Container>
      </footer>
    </>
  );
}

export default Layout;
