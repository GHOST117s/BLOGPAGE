// import logo from './logo.svg';
import './App.css';
import Home from '../src/Components/Home'
import Login from '../src/Components/Login'
import Register from '../src/Components/Register'
import { Route, Routes } from 'react-router-dom';
import UserPage from './Components/UserPage';


function App() {
  return (
  <>

  <Routes>
    <Route path="/" element ={<Home />}/>
    <Route path="/login" element ={<Login />}/>
    <Route path="/register" element ={<Register />}/>      
    <Route path="/UserProfile" element={<UserPage/>}/>

  </Routes>
  </>
  );
   
}

export default App;
