export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  url: string;
}

export async function getPosts() {
  const respone = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data: Post[] = await respone.json();
  const posts = data.map((post) => ({
    ...post,
  })); 
  return posts;
}

export async function getPost(postId: number) {
  const respone = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data: Post = await respone.json();
  const post = {
    ...data,
  };
  return post;
}
