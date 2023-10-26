import axios from "axios";
import Task from "./Task";
import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";

function Tasks() {
  const [data, setData] = useState([]);

  const [addTask, setAddTask] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);
  }

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://127.0.0.1:3000/tasks/", {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchData();
  }, [taskAdded]);
  const taskList = data.map(({ title, description, status, id }) => (
    <Task key={id} title={title} description={description} status={status} />
  ));

  return (
    <div className="container-lg h-screen bg-slate-300">
      <div className="flex h-full w-full items-center justify-center">
        <div className="container h-4/5 md:w-1/2 overflow-y-scroll ps-2 pe-2">
          <div className="flex flex-col">
            <a
              className="container-lg h-16 bg-blue-500 mb-2 rounded-md hover:shadow-md"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setAddTask(!addTask);
              }}
            >
              <div className="flex h-full w-full items-center justify-center">
                {!addTask && <p className="text-white font-bold text-xl">Add Task</p>}
                {addTask && <p className="text-white font-bold text-xl">Stop Adding Tasks</p>}
              </div>
            </a>
            {addTask && <AddTaskForm onTaskAdded={handleTaskAdded}/>}
            {taskList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
