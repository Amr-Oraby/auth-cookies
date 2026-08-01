"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";

function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="cursor-pointer absolute left-4 top-4 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
