import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Trecks = () => {
  const [piste, setPiste] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksCollection = collection(db, "tracks");
      const tracksSnapshot = await getDocs(tracksCollection);
      const tracksData = tracksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPiste(tracksData);
    };

    fetchTracks();
  }, []);

  return (
    <div>
      {piste.map((track) => (
        <div key={track.id}>
          <h1>{track.slug}</h1>
        </div>
      ))}
    </div>
  );
};

export default Trecks;
