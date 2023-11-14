import Login from "./Login";
import Tasks from "./Tasks";
import NavBar from "./NavBar";
import Register from "./Register";
import Loading from "./Loading";
import axios from "axios";

import { useEffect, useState } from "react";

function Home() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await axios
        .get("http://127.0.0.1:3000/is_logged_in/", {
          withCredentials: true,
        })
        .then((res) => {
          // if user is logged in
          if (res.status == 200 || res.status == 304) {
            setLoginStatus(true);
            setShowLogin(false);
            setShowTasks(true);
          }
        })
        .catch((err) => {
          setLoginStatus(false);
          setShowTasks(false);
          setShowLogin(true);
          console.log(err);
        });
      setLoadingStatus(false);
    };
    checkLoginStatus();
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
          loadingStatus={loadingStatus}
        />
        {loadingStatus && <Loading />}
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
