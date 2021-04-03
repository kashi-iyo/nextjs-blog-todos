import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

// useSWRで使用する
// 引数にurlを渡して、そのurlへリクエストを送信し、受け取ったリクエストをjson形式に変換する
const fetcher = (url) => fetch(url).then((res) => res.json());

// useSWRで使用したいエンドポイント
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticFilteredTasks }) {
  // mutate: データのキャッシュを最新の内容に更新してくれる機能
  // tasks: 最新のデータ
  // 第3引数：getStaticProps()でビルド時に取得したデータ
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticFilteredTasks,
  });
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="task page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            // task削除後にコンテンツの更新を行いたいので、mutateをpropsとして渡してあげる
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
        </ul>
        <Link href="/main-page">Main page</Link>
      </Layout>
    </StateContextProvider>
  );
}

export async function getStaticProps() {
  const staticFilteredTasks = await getAllTasksData();

  return {
    props: { staticFilteredTasks },
    revalidate: 3,
  };
}
