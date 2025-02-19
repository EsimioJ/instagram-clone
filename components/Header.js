import Image from "next/image";
import { SearchIcon, PlusCircleIcon, HomeIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* left */}

        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="https://cornoallescalebike.net/wp-content/uploads/2021/06/cornoAlleScaleBike_logo.png"
            //layout="fill"
            className="object-contain"
            onClick={() => router.push("/")}
            width="100"
            height="100"
            alt=""
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
          <Image
            src="https://cornoallescalebike.net/wp-content/uploads/2021/06/cornoAlleScaleBike_logo.png"
            //layout="fill"
            className="object-contain"
            onClick={() => router.push("/")}
            alt="cornogram"
            width="100"
            height="100"
          />
        </div>

        {/* middle */}

        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        <div className="flex space-x-4 items-center">
          <HomeIcon
            onClick={() => router.push("/")}
            className="hidden md:inline-flex  h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
          />

          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
              />
              <Image
                onClick={signOut}
                src={session.user.image}
                alt="user-image"
                className="h-10 rounded-full cursor-pointer"
                width="100"
                height="100"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
