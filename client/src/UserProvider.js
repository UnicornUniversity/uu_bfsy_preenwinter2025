import { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("authToken") || ""
  );
  const [authUser, setAuthUser] = useState(null); // server user shape: { id, email }
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Use raw server id (e.g., "1", "2")
  const [users, setUsers] = useState([]);
  const userMap = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      const id = String(u.id);
      const email = String(u.email || "");
      const emailLocal = email.split("@")[0] || `user${id}`;
      map[id] = { id, email, name: emailLocal };
    });
    return map;
  }, [users]);

  async function login({ email, password }) {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const message = data?.error || `Login failed (${res.status})`;
      throw new Error(message);
    }
    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    setToken(data.token);
    setAuthUser(data.user);
    return data.user;
  }

  async function logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (_e) {
      // ignore network errors on logout
    } finally {
      localStorage.removeItem("authToken");
      setToken("");
      setAuthUser(null);
    }
  }

  async function checkAuth() {
    if (!token) {
      setAuthUser(null);
      return null;
    }
    setIsCheckingAuth(true);
    try {
      const res = await fetch("http://localhost:4000/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      // data.user contains { id, email } per server
      setAuthUser({ id: data.user.id, email: data.user.email });
      return data.user;
    } catch (_e) {
      localStorage.removeItem("authToken");
      setToken("");
      setAuthUser(null);
      return null;
    } finally {
      setIsCheckingAuth(false);
    }
  }

  useEffect(() => {
    // Validate token on mount
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("http://localhost:4000/api/users");
        if (!res.ok) return;
        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (_e) {
        // ignore
      }
    }
    loadUsers();
  }, []);

  const value = {
    userMap,
    userList: Object.keys(userMap).map((userId) => userMap[userId]),
    // auth state from server
    token,
    authUser, // { id, email } from server
    isCheckingAuth,
    // handlers
    login,
    logout,
    checkAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
