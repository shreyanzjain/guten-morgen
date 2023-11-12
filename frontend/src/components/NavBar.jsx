/* eslint-disable react/prop-types */
import axios from "axios";
import { useCookies } from "react-cookie";

function NavBar({ onClickRegister, onClickLogin }) {
  const [cookie] = useCookies(["user_token"]);
  const handleLogout = async () => {
    await axios
      .get("http://127.0.0.1:3000/logout/", {
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mx-auto w-full h-1/6 bg-slate-300">
      <div className="mx-auto w-full bg-teal-900 h-16 fixed">
        <div className="flex h-full items-center justify-between text-slate-50">
          <div className="ms-6 me-6 font-bold">Guten-Morgen</div>
          <div className="flex items-center justify-end me-6 font-bold">
            {!cookie.user_token && (
              <a
                className="ms-6 me-6"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClickRegister();
                }}
              >
                Register
              </a>
            )}
            {!cookie.user_token && (
              <a href="#" className="me-6" onClick={(e) => {
                e.preventDefault();
                onClickLogin();
              }}>
                Login
              </a>
            )}
            {cookie.user_token && (
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
