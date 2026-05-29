'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter()
    async function handleLogout() {
        await authClient.signOut({
        fetchOptions: {
        onSuccess: () => {
        router.push("/Signin"); // redirect to login page
    },
  },
});
    }

  return (
    <div >
      <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton
