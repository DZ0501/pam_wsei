import { useEffect, useState } from "react";
import { getUserAlbums} from "./requests";
import { Album } from "../albums/requests";

export function useGetUserAlbums(userId: string) {
  const [albums, setUserAlbums] = useState<Album[]>();

  useEffect(()=>{
    getUserAlbums(userId).then((data) => setUserAlbums(data));
  }, [userId]);

  return albums;
}
