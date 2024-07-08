import { useEffect, useState } from "react";
import { Photo, getPhotosByAlbumId } from "./requests";

export function useGetPhotosByAlbumId(albumId: string) {
  const [photo, setPhotos] = useState<Photo[]>();

  useEffect(()=> {
    getPhotosByAlbumId(albumId).then((data) => setPhotos(data));
  }, [albumId]);

  return photo;
}
