import { useEffect, useState } from "react";
import { Photo, getPhotos } from "./requests";

export function useGetPhotos() {
  const [photo, setPhotos] = useState<Photo[]>();

  useEffect(()=>{
    getPhotos().then((data) => setPhotos(data));
  }, []);

  return photo;
}
