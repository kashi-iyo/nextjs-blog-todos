import Link from "next/link";
import { useContext } from "react";
import Cookie from "universal-cookie"
import { StateContext } from "../context/StateContext";

const cookie = new Cookie()

export default function Task({ task, taskDeleted }) {
  const { setSelectedTask } = useContext(StateContext)

  const deleteTask = async () => {
    // タスクを削除した後に、新しいデータに更新したい。そんな時はmutateを使用する。
    // propsとして受け取ったmutateを使用する
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`
      }
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid")
      }
    })
    // mutateを実行
    taskDeleted()
  }

  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <Link href={`/tasks/${task.id}`}><span>{task.title}</span></Link>
      <div>
        <span onClick={() => setSelectedTask(task)}>編集</span>
        <span onClick={deleteTask}>削除</span>
      </div>
    </div>
  )
}