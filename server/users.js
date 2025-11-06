import bcrypt from "bcryptjs";

// Generate 10 mocked users with hashed passwords at startup.
// Emails: user1@example.com ... user10@example.com
// Plain password for all: Password123!

export const DEFAULT_PASSWORD = "Password123!";

function generateMockUsers() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const email = `user${i}@example.com`;
    const id = String(i);
    const passwordHash = bcrypt.hashSync(DEFAULT_PASSWORD, 10);
    users.push({ id, email, passwordHash });
  }
  return users;
}

export const users = generateMockUsers();

export function findUserByEmail(email) {
  return users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
}

export function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}
