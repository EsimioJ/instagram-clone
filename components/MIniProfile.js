import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      
      
      {/*  questa dice che non c'è src
          CONTROLLARE

          
          <Image
        className="h-16 rounded-full border p-[2px]"
        src={session?.user.image}
        alt="user-image"
        width="100"
        height="100"
      /> */}
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">
        Sign out
      </button>
    </div>
  );
}
