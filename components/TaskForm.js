import { useContext } from "react"
import Cookie from "universal-cookie"
import { StateContext } from "../context/StateContext"

const cookie = new Cookie()

export default function TaskForm({ taskCreated }) {
  const { selectedTask, setSelectedTask } = useContext(StateContext)

  // 後にonSubmitに紐付ける。
  // リロードしないようにpreventDefault()つける
  const create = async (e) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`
      }
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid")
      }
    })
    // 初期化
    setSelectedTask({ id: 0, title: "" })
    // mutateを実行
    taskCreated()
  }

  const update = async (e) => {
    e.preventDefault()
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        }
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid")
      }
    })
    setSelectedTask({ id: 0, title: "" })
    // mutateを実行
    taskCreated()
  }
  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          className="text-black"
          type="text"
          value={selectedTask.title}
          onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})}
        />
        <button type="submit">
          {selectedTask.id !== 0 ? "update": "create"}
        </button>
      </form>
    </div>
  )

}