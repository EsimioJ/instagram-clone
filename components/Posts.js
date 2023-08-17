import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  //const [slug, setSlug] = useState("mezzasela")
  const slug= "mezzasela"

  useEffect(() => {
    console.log(slug)
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        //where("track_id", "==", "cuplina"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}
