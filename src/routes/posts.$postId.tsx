import { Link, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { fetchPost } from '../utils/posts'
import { NotFound } from '~/components/NotFound'
import { PostErrorComponent } from '~/components/PostError'

const SuspendedSection = lazy(() => import('~/components/SuspendedSection'))

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params: { postId } }) => fetchPost({ data: postId }),
  // head:(ctx) => {
  //   return {
  //     meta: [
  //       {
  //         title: ctx.loaderData.title,
  //       },
  //     ],
  //   };
  // },
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
})

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="space-y-2">
      {/* <title>{post.title}</title> */}
      <Suspense fallback={<div>Loading...</div>}>
        <SuspendedSection postId={post.id} />
      </Suspense>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: post.id,
        }}
        activeProps={{ className: 'text-black font-bold' }}
        className="inline-block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  )
}
