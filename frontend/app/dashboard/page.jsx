import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    return <div className="text-red-500">Unauthorized</div>;
  }

  return <div>Welcome to dashboard</div>;
}
