export interface Album {
  id: number;
  title: string;
  userId: number;
}

export async function getAlbums() {
  const respone = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const album: Album[] = await respone.json();
  return album;
}
export async function getAlbumById(albumId: string) {
  const respone = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );
  const data: Album = await respone.json();
  const album = {
    ...data,
  };
  return album;
}
