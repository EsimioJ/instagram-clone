import { useEffect, useState } from "react";
// import Track from "./Track";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const asi = async () => {
  const tracks = await getDocs(collection(db, "tracks"));
  //console.log ("=========>",tracks)
  tracks.forEach((track) => {
    return `${track.id} => ${JSON.stringify(track.data())}`;
  });

};

export default function Tracks() {

 asi()
  // const [tracks, setTracks] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "tracks"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       console.log(snapshot);
  //       setTracks(snapshot.docs);
  //     }
  //     );
  //     console.log(unsubscribe);
  //   return unsubscribe;
  // }, [db]);

  return (
    <div>
      bubiii
    {/* {tracks.map((track) => (
        <p key={track}>{track}</p>
        // <Track
        //   key={track.id}
        //   id={track.id}
        //   username={track.data().username}
        //   userImg={track.data().profileImg}
        //   img={track.data().image}
        //   caption={track.data().caption}
        // />
      ))} */}
    </div>
  );
}
