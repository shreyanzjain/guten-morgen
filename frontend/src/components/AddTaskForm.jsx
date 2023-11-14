/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTaskSubmit = async () => {
    await axios
      .post(
        "http://127.0.0.1:3000/add_task",
        {
          title: title,
          description: description,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setTitle("");
        setDescription("");
        onTaskAdded();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container h-64 w-full bg-white rounded-md mb-2">
      <div className="flex flex-col w-full h-full p-2 gap-2">
        <input
          type="text"
          id="form-title"
          className="h-1/6 px-2 py-1 border-2 rounded-md border-slate-400 focus:outline-none focus:border-blue-300"
          placeholder="Title of your task goes here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="h-4/6 px-2 py-1 border-2 border-slate-400 rounded-md focus:outline-none focus:border-blue-300"
          placeholder="Enter a long description here..."
          id="form-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <a
          className="container h-1/6 w-full bg-teal-900 rounded-md hover:shadow-md hover:shadow-teal-300"
          href=""
          onClick={async (e) => {
            e.preventDefault();
            await handleTaskSubmit();
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-white">Submit</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default AddTaskForm;
