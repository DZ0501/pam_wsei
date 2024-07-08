import { useEffect, useState } from "react";
import { User, getUserPhotos} from "./requests";
import { Photo } from "../photos/requests";

export function useGetUserPhotos(userId: string) {
  const [photos, setUserPhotos] = useState<Photo[]>();

  useEffect(()=>{
    getUserPhotos(userId).then((data) => setUserPhotos(data));
  }, [userId]);

  return photos;
}
