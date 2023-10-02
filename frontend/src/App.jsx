import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div>
      <div className="h-screen w-full">
        <NavBar />
        <Login />
      </div>
      <div className="h-screen w-full bg-slate-300">
        <div className="h-24 w-full"></div>
        <Tasks />
      </div>
    </div>
  );
}

export default App;
