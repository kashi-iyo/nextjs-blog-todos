import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";

// ここで得られるpostは、サーバーサイドで更新を行なっても、変更が反映されることはない
// これがStatic Site Generationの特徴

// しかし、コンテンツの更新をしたい場合がある。
// そんな時に使用するのが、Incremental Static Regeneration
export default function Post({ post }) {
  const router = useRouter()

  if (router.isFallback || !post) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <p>
        {"ID : "}
        {post.id}
      </p>
      <p>{post.title}</p>
      <p>{post.created_at}</p>
      <p>{post.content}</p>
      <Link href="/blog-page">
        <span>back to blog page</span>
      </Link>
    </Layout>
  )
}

// getAllPostIdsを実行してID一覧を取得
export async function getStaticPaths() {
  const paths = await getAllPostsIds()
console.log(paths)
  return {
    paths,
    fallback: true
  }
}

// 取得したparamsからidを抜き取って、post１件分のデータを取得する
export async function getStaticProps({params}) {
  const { post } = await getPostData(params.id)
  return {
    props: {
      post
    },
    revalidate: 3,
  }
}