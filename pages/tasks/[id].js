import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Task({ staticTask, id }) {
  const router = useRouter()
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      initialData: staticTask,
    }
  )
  useEffect(() => {
      mutate()
  }, [])
  if (router.isFallback || !task) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={task.title}>
      <span>
        {"ID : "}
        {task.id}
      </span>
      <p>{task.title}</p>
      <p>{task.created_at}</p>
      <Link href="/task-page"><span>back to tasks</span></Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllTaskIds()

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { task: staticTask } = await getTaskData(params.id)
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  }
}