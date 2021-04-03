import Link from "next/link"

export default function Post({post}) {

  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/posts/${post.id}`}><span>{post.title}</span></Link>
    </div>
  )
}