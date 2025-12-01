import { useContext, useState } from "react";
import { UserContext } from "./UserProvider.js";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";

function Login() {
  const { userList, login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleDemoLogin(userId) {
    // user ids are like "u1", "u2" ... map to server demo users user1@example.com
    const n = String(userId).replace(/^u/, "");
    const email = `user${n}@example.com`;
    const password = "Password123!"; // server default
    login({ email, password }).catch(() => {
      // ignore for demo; production should show feedback
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
    } catch (e) {
      setError(e?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Stack gap={3} className="mx-auto" style={{ maxWidth: 420 }}>
      <div>
        <h5 className="mb-3">Sign in</h5>
        {error ? (
          <Alert variant="danger" className="py-2 mb-3">
            {error}
          </Alert>
        ) : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="loginEmail">
            <Form.Label className="small mb-1">Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user1@example.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label className="small mb-1">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password123!"
              required
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              disabled={submitting}
              onClick={() => {
                setEmail("user1@example.com");
                setPassword("Password123!");
              }}
            >
              Fill demo creds
            </Button>
          </div>
        </Form>
      </div>

      <div>
        <div className="text-muted small mb-2">
          Or quick login as demo user:
        </div>
      </div>
    </Stack>
  );
}

export default Login;
