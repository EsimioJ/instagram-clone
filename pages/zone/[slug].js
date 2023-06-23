import React from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Trecks from "@/components/Trecks";
import { useRouter } from "next/router";

const Zone = () => {
  const router = useRouter();
  const zona = router.query.slug;
  console.log(zona);
  console.log(router);
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
      <h1>{zona}</h1>
      <Trecks zona={zona}/>
    </div>
  );
};

export default Zone;
