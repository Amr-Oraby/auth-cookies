import Link from "next/link";
type UserType = {
  email: string;
  id: number;
  name: string;
  role: string;
};

function Welcome({ user }: { user: UserType }) {
  if (!user) return null;
  const { role, name } = user;

  return (
    <>
      {role == "admin" && (
        <Link
          href="/admin"
          className="absolute top-5 right-5 border border-[#ddd] py-2 px-4 rounded-xl"
        >
          Admin Page
        </Link>
      )}
      <h1 className=" flex gap-5 flex-wrap text-[40px]  w-fit mx-auto mt-[200px]">
        <span>Welcome</span>
        <span>
          <span className="font-bold text-yellow-400">{name}</span> as{" "}
          {role == "admin" ? "an" : "a"}
        </span>
        <span className="text-blue-700 font-bold italic">{role}</span>
      </h1>
    </>
  );
}

export default Welcome;
