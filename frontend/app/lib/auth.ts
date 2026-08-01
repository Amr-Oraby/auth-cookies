export async function getCurrentUser() {
  const response = await fetch("http://localhost:4000/user", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export async function logout() {
  const response = await fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}
