import { useEffect, useState } from "react";
import { Post, getPosts } from "./requests";

export function useGetPosts() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(()=>{
    getPosts().then((data) => setPosts(data));
    
  }, []);

  return posts;
}
