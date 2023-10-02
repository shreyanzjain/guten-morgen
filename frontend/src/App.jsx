import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  return(
    <div className='h-screen w-full'>
      <NavBar/>
      <Login/>
    </div>
  );
}

export default App;