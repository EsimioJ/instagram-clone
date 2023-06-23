
import React from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Trecks from "@/components/Trecks";


const Zone = () => {

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
      <div>Le Zone</div>
      <Trecks zona="tutte"/>
    </div>
  );
};

export default Zone;
