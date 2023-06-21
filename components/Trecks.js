import { db } from "@/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Trecks = () => {
  const [piste, setPiste] = useState([]);

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

  console.log(piste);

  return (
    <div>
        <div className="grid grid-cols-3 gap-4 font-bold">
            <span>Tracciati</span>
            <span>Zone</span>
            <span>Stato</span>
        </div>
      {piste.map((track) => (
        <div key={track.id} className="grid grid-cols-3 gap-4">
          <Link href={`/tracks/${track.slug}`}>
            <span>{track.num}</span> -<span> {track.title}</span>
          </Link>
          <Link href={`/zone/${track.zona.slug}`}>
            <span>{track.zona.nome}</span>
          </Link>
          <span>{track.stato}</span>
        </div>
      ))}
    </div>
  );
};

export default Trecks;
