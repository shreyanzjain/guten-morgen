import axios from "axios";
import Task from "./Task";
import { useState } from "react";

function Tasks() {
  const [data, setData] = useState([]);
  const handleSubmit = async () => {
    await axios.get('https://127.0.0.1:3000/tasks/', {
      withCredentials: true
    })
    .then((res) => {
      setData(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const taskList = data.map(({title, description, status, id})=> (
    <Task key={id}
    title={title}
    description={description}
    status={status}/>
  ));

  return (
    <div className="container h-5/6">
      <div className="flex h-full w-full justify-start">
        <div className="container w-1/4 pt-2">
          <div className="flex justify-end me-2">
            <button type="button" className="bg-blue-700 text-lg font-bold px-2 py-2 rounded-md shadow-md text-white" onClick={handleSubmit}>Get Data</button>
          </div>
        </div>
        <div className="container w-1/2 overflow-y-scroll pe-2">
          {taskList}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
