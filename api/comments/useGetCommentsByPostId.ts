import { useEffect, useState } from "react";
import { Comments, getCommentsbyPostId } from "./requests";

export function useGetCommentsByPostId(postId: string) {
  const [comments, setComments] = useState<Comments[]>();

  useEffect(()=>{
    getCommentsbyPostId(Number(postId)).then((data) => setComments(data));
  }, [postId]);

  return comments;
}
