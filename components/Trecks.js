import { db } from "@/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Trecks = (zona) => {
  console.log("ZONA",zona);
  const [piste, setPiste] = useState([]);

  const stati = ["OK","KO", "Warn"]

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksCollection = collection(db, "tracks");
      const tracksSnapshot = await getDocs(tracksCollection);
      const tracks = tracksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      await Promise.all(
        tracks.map(async (track) => {
          const zona = await getDoc(track.zona);
          track.zona = {
            id: zona.id,
            ...zona.data(),
          };
        })
      );

      setPiste(tracks);
    };

    fetchTracks();
  }, []);

  //console.log(piste);

  return (
    <div className="w-full bg-gray-200 p-4  text-center">
        <div className="grid grid-cols-3 text-lg gap-4 font-extrabold items-center">
            <span>Tracciati</span>
            <span><Link href={"/zone"}>Zone</Link></span>
            <span>Stato</span>
        </div>
      {piste.map((track) => (
        <div key={track.id} className="grid grid-cols-3 gap-4">
          <Link href={`/tracks/${track.slug}` } className="text-left">
            <span>{track.num}</span> -<span className="font-bold"> {track.title}</span>
          </Link>
          <Link href={`/zone/${track.zona.slug}`}>
            <span className={`zona ${track.zona.slug}` }>{track.zona.nome}</span>
          </Link>
          <span className={`${stati[track.stato]}`}>{stati[track.stato]}</span>
        </div>
      ))}
    </div>
  );
};

export default Trecks;
