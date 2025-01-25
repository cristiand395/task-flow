import { currentUser } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const user = await currentUser();
  return (
    <div>
      <h1>Protected</h1>
      <p>User: {user?.firstName}</p>
    </div>
  );
}