import { createContext, useState } from "react";

export const StateContext = createContext();
export default function StateContextProvider(props) {
  // 選択されたtask, 更新用の関数を定義
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: "" });

  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
