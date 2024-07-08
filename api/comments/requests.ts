export interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }
  
  export async function getComments() {
    const respone = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    const comments: Comments[] = await respone.json();
    return comments;
  }
  
  export async function getCommentsbyPostId(postId: number) {
    const respone = await fetch(
      `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`
    );
    const comments: Comments[] = await respone.json();
    return comments;
  }
  