'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.push('/Signin');
    router.refresh();
  }

  return (
    <button
      className="k-btn k-btn-ghost cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;