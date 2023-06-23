import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Track from "@/components/Track";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";


const Zone = () => {
  const router = useRouter();
  const slug = router.query.title;
  console.log(slug);
  console.log(router);

  const q = query(collection(db, "tracks"), where("slug", "==", slug));


  const stati = ["OK","KO", "Warn"]

  const [track, setTrack] = useState();

  useEffect(() => async () => {
    //   const docRef = doc(db, "tracks", "cuplina");
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     setTrack(docSnap.data())
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setTrack(doc.data())
      });

    //fetchTrack();
  }, []);

  console.log(track);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Corno alle Scale Biker APP - le zone della bike area </title>
        <meta
          name="description"
          content="Se ti ricorda IG ti stai sbagiando!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      <Header />
      <h1>{track?.num} - {track?.title}
      <span className={`${stati[track?.stato]}`}>{stati[track?.stato]}</span>
      </h1>
      
      {/* <Track title={title}/> */}
    </div>
  );
};

export default Zone;
