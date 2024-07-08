import { useEffect, useState } from "react";
import { Album, getAlbums } from "./requests";

export function useGetAlbums() {
  const [albums, setAlbums] = useState<Album[]>();

  useEffect(()=>{
    getAlbums().then((data) => setAlbums(data));
    
  }, []);

  return albums;
}
