import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Track({ img, trackImg, caption, trackname, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "tracks", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tracks", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.track.uid) !== -1
    );
  }, [likes]);
  async function likeTrack() {
    if (hasLiked) {
      await deleteDoc(doc(db, "tracks", id, "likes", session.track.uid));
    } else {
      await setDoc(doc(db, "tracks", id, "likes", session.track.uid), {
        trackname: session.track.trackname,
      });
    }
  }
  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "tracks", id, "comments"), {
      comment: commentToSend,
      trackname: session.track.trackname,
      trackImage: session.track.image,
      timestamp: serverTimestamp(),
    });
  }
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* track Header */}
      <div className="flex items-center p-5">
        <Image
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={trackImg}
          alt={trackname}
          width="100"
          height="100"
        />
        <p className="font-bold flex-1">{trackname}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* track Image */}
      <Image className="object-cover w-full" src={img} alt="" width="100" height="100" />
      {/* track Buttons  */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likeTrack}
                className="text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={likeTrack} className="btn" />
            )}
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      
    
    </div>
  );
}
