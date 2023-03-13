import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Container, Navbar, Nav } from 'react-bootstrap';

import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'

export default function EditProfile() {


    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs , setInputs] = useState("");
    const [file, setFile] = useState(null);
    const [user , setUser] = useState([]);

    
    useEffect(()=>{
        getUser();
    } , [])

    function getUser(){
        axios.get(`http://localhost/React/redux-project/backend/users.php/${id}`)
        .then(response => {
            console.log(response.data , 'sss');
            setUser(response.data);
            console.log(user);
        })
    }
    const handleEditUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
      const dispatch=useDispatch();
      const handleEditUserSubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("name", inputs['name']);
        formEditData.append("email", inputs['email']);
        formEditData.append("password", inputs['password']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost/React/redux-project/backend/editUserProfile.php/${id}`, formEditData
          );
          console.log(response.data);
          navigate(`/Profile`);
        //   window.location.assign(`/profile/${id}`);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>

<Navbar id="navBarContainer">
      <Container>
      </Container>
      <Container id="diverr">
        <Navbar.Brand><a href="/addBook"><button id="add" style={{marginLeft : '5vw' , height : "4vw" , fontSize : '18px' , width : '125px'}}>Add Book</button></a></Navbar.Brand>
      </Container>
        <Nav >
            <Nav.Link id="logout" href="/Home"><button id="navvv" className="home">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="navvv" className="profile">Profile</button></Nav.Link>    
            <Nav.Link id="logout"><button id="navvv" className="out" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>     
        </Nav>
    </Navbar>

    <div id="landing">
<div className='profileForm'>
    <h1>Edit User</h1>
    <form onSubmit={handleEditUserSubmit}>
    <label htmlFor="">Name</label>
      <input type="text" placeholder="name" name="name" defaultValue={user.name} onChange={handleEditUser} />
    {/* <label htmlFor="">Email</label>
      <input /> */}
    <label htmlFor="">Email</label>
      <input type="text"  placeholder="email"  name="email" defaultValue={user.email}  onChange={handleEditUser} />
    <label htmlFor="">Password</label>
      <input  type="password"  placeholder="password" name="password" defaultValue={user.password} onChange={handleEditUser} />
      <br/>
      <input type="file" style={{border:'none',borderRadius:'0'}}  placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/>
      <button type='submit'>Submit</button>
    </form>
   </div>
   </div>
        
    </>
  )
}
