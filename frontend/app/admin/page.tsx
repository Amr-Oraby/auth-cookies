import { cookies } from "next/headers";
import Link from "next/link";
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

  if (user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="text-[50px] font-bold w-fit m-auto">
      <h1> This page is only for admins</h1>
      <Link
        className="py-2 px-4 border border-[#ddd] rounded-xl text-xl font-normal"
        href="/"
      >
        Back Home
      </Link>
    </div>
  );
}

export default page;
