// import logo from './logo.svg';
import './App.css';
import Home from '../src/Components/Home'
import Login from '../src/Components/Login'
import Register from '../src/Components/Register'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserPage from './Components/UserPage';
import CategoriesPage from './Components/CategoriesPage';
import Posts from './Components/Posts';
import Edit from './Components/Edit';
import UserUpdate from './Components/UserUpdate';
import ImageUpdate from './Components/ImageUpdate';



function App() {
  return (
  <>
 

  <Routes>
    <Route path="/" element ={<Home />}/>
    <Route path="/login" element ={<Login />}/>
    <Route path="/register" element ={<Register />}/>    
      
    <Route path="/userprofile" element={<UserPage/>}/>
    <Route path="/category/:id" element={<CategoriesPage/>}/>
    <Route path="/posts/:id" element={<Posts/>}/>
    <Route path="/editpost/:id" element={<Edit/>}/>
    <Route path="/updateuser" element={<UserUpdate/>}/> 
    <Route path="/updateimage" element={<ImageUpdate/>}/>

  </Routes>

  </>
  );
   
}

export default App;
