import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Login from './components/Login';
import Novels from './components/Novels';
import AddBook from './components/AddBook';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import EditBook from "./components/EditBook";

function App() {
  return (
    <div>
            <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />
              <Route path="/Home" element={<Novels />}/>
              <Route path="/addBook" element={<AddBook />}/>
              <Route path="/Profile" element={<Profile />}/>
              <Route path='/profile/:id/edit' element={<EditProfile/>}/>
              <Route path='/EditBook/:id/edit' element={<EditBook/>}/>
            </Routes>
            </Router>
      
    </div>
  );
}

export default App;
