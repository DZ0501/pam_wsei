import { useEffect, useState } from "react";
import { Photo, getPhoto } from "./requests";

export function useGetPhoto(id: string) {
  const [photo, setPhoto] = useState<Photo>();

  useEffect(()=>{
    getPhoto(id).then((data) => setPhoto(data));
  }, [id]);

  return photo;
}
