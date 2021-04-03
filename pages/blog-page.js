import Layout from "../components/Layout";
import Link from "next/link"
import { getAllPostsData } from "../lib/posts";
import Post from "../components/Post";

// 下記で呼び出したgetStaticProps()から得られるpropsをコンポーネントに渡すことで、
// ビルド時にサーバーサイドからデータを取得してきて、コンポーネント内のHTMLに埋め込む
export default function BlogPage({filteredPosts}) {

  return (
    <Layout title="blog page">
      <ul>
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} /> )
        }
      </ul>
      <Link href="/main-page">
        Main page
      </Link>
    </Layout>
  )
}

// ビルド時に呼び出されて、サーバーサイドで行われる処理
export async function getStaticProps() {
  const filteredPosts = await getAllPostsData()
  return {
    props: { filteredPosts },
    revalidate: 3,  // reavlidateを追加することで、Incremental Static Regenerationにより更新可能になる
  }
}