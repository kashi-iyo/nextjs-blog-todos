import Link from "next/link"
import { useRouter } from "next/router"
import Cookie from "universal-cookie"
import Layout from "../components/Layout"

const cookie = new Cookie()

export default function MainPage() {
  const router = useRouter()
  const logout = () => {
    cookie.remove("access_token")
    router.push("/")
  }
  return (
    <Layout title="main page">
      <div>
        <Link href="/blog-page"><a>Visit Blog By SSG + ISR</a></Link>
        <Link href="/task-page"><a>Visit Task By SSG + ISR</a></Link>
      </div>
      <span onClick={logout}>logout</span>
    </Layout>
  )
}