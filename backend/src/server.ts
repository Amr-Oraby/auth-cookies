import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

const PORT = 4000;

// -----------------------------
const users = [
  {
    id: 1,
    name: "Oraby",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Ahmed",
    email: "user@test.com",
    password: "123456",
    role: "user",
  },
];

// Routes

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (currentUser) =>
      currentUser.email === email && currentUser.password === password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // if correct create cookie
  res.cookie("session", String(user.id), {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  return res.json(user);
});

// get user
app.get("/user", (req, res) => {
  const userId = Number(req.cookies.session);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// admins
app.get("/admin/users", (req, res) => {
  const userId = Number(req.cookies.session);

  const currentUser = users.find((user) => user.id === userId);

  if (!currentUser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (currentUser.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  return res.json(users);
});

// logout
app.post("/logout", (req, res) => {
  res.clearCookie("session");

  return res.json({
    message: "Logged out successfully",
  });
});
// -----------------------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
