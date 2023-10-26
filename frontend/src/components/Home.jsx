import Login from "./Login";
import Tasks from "./Tasks";
import NavBar from "./NavBar";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";

function Home() {
  const [cookie] = useCookies(['user_token']);
	const [showLogin, setShowLogin] = useState(false);

	useEffect(() => {
		if (!cookie.user_token) {
			setShowLogin(true);
		} else {
			setShowLogin(false);
		}
	}, [cookie.user_token]);

  return (
    <div>
      <div className="h-auto">
        <NavBar />
        {showLogin && <Login />}
      </div>
       {!showLogin && <Tasks/>}
    </div>
  );
}

export default Home;
