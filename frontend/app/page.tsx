import { cookies } from "next/headers";
import LogoutButton from "./components/LogoutButton";
import Welcome from "./components/Welcome";
import { redirect } from "next/navigation";

async function page() {
  const cookieStore = await cookies();

  const response = await fetch("http://localhost:4000/user", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    redirect("/login");
  }

  const user = await response.json();
  return (
    <div className="relative min-h-screen">
      <Welcome user={user} />
      <LogoutButton />
    </div>
  );
}

export default page;
