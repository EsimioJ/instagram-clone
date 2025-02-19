import Posts from "./Posts";
import MiniProfile from "./MIniProfile";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";
import Tracks from "./Tracks";
import Trecks from "./Trecks";

export default function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid ${
        session
          ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto"
          : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"
      }  `}
    >
      <section className="md:col-span-2">

        {/* Map */}
        {/* <Map /> */}

        {/* Trecks */}
        <Trecks zona="tutte"/>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>

      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* Mini Profile */}
          <MiniProfile />

          {/* Suggestions */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
}
