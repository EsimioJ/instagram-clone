import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";
import Trecks from "@/components/Trecks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Corno alle Scale Biker APP</title>
        <meta name="description" content="Se ti ricorda IG ti stai sbagiando!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      <Header />
      {/* <div>ciao</div>
      <Trecks /> */}

      {/* Feed */}
      <Feed />

      {/* Modal */}
      <UploadModal />
    </div>
  );
}
