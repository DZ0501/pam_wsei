import { useEffect, useState } from "react";
import { Comments, getComments } from "./requests";


export function useGetComments() {
  const [comments, setComments] = useState<Comments[]>();

  useEffect(()=> {
    getComments().then((data) => setComments(data));
  }, []);

  return comments;
}
