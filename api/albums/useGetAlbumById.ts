import { useEffect, useState } from "react";
import { Album, getAlbumById } from "./requests";

export function useGetAlbumById(albumId: string) {
  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    getAlbumById(albumId).then((data) => setAlbum(data));
  }, [albumId]);

  return album;
}
