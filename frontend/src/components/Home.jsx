import Login from "./Login";
import Tasks from "./Tasks";
import NavBar from "./NavBar";
import Register from "./Register";
import axios from "axios";

import { useEffect, useState } from "react";

function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await axios
        .get("http://127.0.0.1:3000/isLoggedIn/", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200 || res.status == 304) {
            setLoginStatus(true);
          } else {
            setLoginStatus(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    checkLoginStatus();

    // console.log(loginStatus);
    if (!loginStatus) {
      setShowLogin(true);
      setShowTasks(false);
    } else {
      setShowLogin(false);
      setShowTasks(true);
    }
  }, [loginStatus]);

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div>
      <div className="h-auto">
        <NavBar
          onClickRegister={handleRegisterClick}
          onClickLogin={handleLoginClick}
          setLoginStatus={setLoginStatus}
          loginStatus={loginStatus}
        />
        {showRegister && <Register onClickSignIn={handleLoginClick} />}
        {showLogin && (
          <Login
            onClickSignUp={handleRegisterClick}
            setLoginStatus={setLoginStatus}
          />
        )}

        {showTasks && <Tasks />}
      </div>
    </div>
  );
}

export default Home;
