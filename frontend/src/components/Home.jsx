import Login from "./Login";
import Tasks from "./Tasks";
import NavBar from "./NavBar";
import Register from "./Register";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function Home() {
  const [cookie] = useCookies(["user_token"]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    if (!cookie.user_token) {
      setShowLogin(true);
      setShowTasks(false);
    } else {
      setShowLogin(false);
      setShowTasks(true);
    }
  }, [cookie.user_token]);

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
        />
        {showRegister && <Register onClickLogin={handleLoginClick}/>}
        {showLogin && <Login onClickRegister={handleRegisterClick}/>}
        
        {showTasks && <Tasks />}
      </div>
    </div>
  );
}

export default Home;
