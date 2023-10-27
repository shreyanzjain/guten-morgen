/* eslint-disable react/prop-types */
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import axios from "axios";

function Register({ onClickLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "https://127.0.0.1:3000/add/user",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        onClickLogin();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen bg-slate-300">
      <div className="flex h-4/6 items-start justify-center">
        <div className="h-full w-3/4 md:w-1/2 lg:w-1/3 rounded-lg bg-slate-50 shadow-md mt-32">
          <div className="container h-1/6 rounded-t-lg bg-slate-100 border-b-2 border-slate-200 mb-3">
            <div className="flex h-full items-center justify-center text-xl font-semibold text-slate-700">
              <div className="w-11/12 text-2xl text-semibold">
                <div className="flex items-center justify-center">
                  <LoginIcon className="me-2" />
                  <p>Sign Up</p>
                </div>
              </div>
            </div>
          </div>
          <form className="h-3/5" onSubmit={handleSubmit}>
            <div className="container h-1/3">
              <div className="flex h-full items-center justify-center">
                <input
                  value={username}
                  id="form-username"
                  type="text"
                  className="w-11/12 h-4/6 px-4 text-xl font-semibold bg-slate-100 border-2 border-slate-200 focus:outline-none focus:caret-slate-300"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="container h-1/3">
              <div className="flex h-full items-center justify-center">
                <input
                  value={password}
                  id="form-password"
                  type="password"
                  className="w-11/12 h-4/6 px-4 text-xl font-semibold bg-slate-100 border-2 border-slate-200 focus:outline-none focus:caret-slate-300"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="container h-1/3">
              <div className="flex h-full items-center justify-center">
                <button
                  className="bg-black h-4/6 w-11/12 text-white text-xl font-semibold"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="container h-1/6 mt-4 border-t-2 border-slate-200">
            <div className="flex flex-col h-full items-center justify-center">
              <p>Have an account?</p>
              <a
                href="#"
                className="text-blue-700 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onClickLogin();
                }}
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
