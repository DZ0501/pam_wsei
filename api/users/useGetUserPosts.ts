import { useEffect, useState } from "react";
import { getUserPosts } from "./requests";
import { Post } from "../posts/requests";

export function useGetUserPosts(userId: string) {
  const [posts, setUserPosts] = useState<Post[]>();

  useEffect(() => {
    getUserPosts(userId).then((data) => setUserPosts(data));
  }, [userId]);

  return posts;
}
