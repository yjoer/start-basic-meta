import { use } from 'react';

export type PostType = {
  id: string
  title: string
  body: string
}

const fetchPost = async (postId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const post = (await res.json()) as PostType

  return post
}

export default function SuspendedSection({ postId }: { postId: string }) {
  const post = use(fetchPost(postId))

  return (
    <>
      <title>{post.title}</title>
      <div>Suspended Component</div>
    </>
  )
}
