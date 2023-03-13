import React, { useEffect, useState } from 'react';
import './EditBook.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Container, Navbar, Nav } from 'react-bootstrap';

import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'

export default function EditBook() {


    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs , setInputs] = useState("");
    const [file, setFile] = useState(null);
    // const [book , setBook] = useState([]);

    
    // useEffect(()=>{
    //     getUser();
    // } , [])

    // function getUser(){
    //     axios.get(`http://localhost/React/redux-project/backend/books.php/${id}`)
    //     .then(response => {
    //         console.log(response.data , 'sss');
    //         setBook(response.data);
    //         console.log(book);
    //     })
    // }
    const handleEditBook = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
      const dispatch=useDispatch();

      const handleEditbooksubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("title", inputs['title']);
        formEditData.append("auther", inputs['auther']);
        formEditData.append("description", inputs['description']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost/React/redux-project/backend/editBookProfile.php/${id}`, formEditData
          );
          console.log(response.data);
          navigate(`/Home`);
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
    <h1>Edit Book</h1>
    <form onSubmit={handleEditbooksubmit}>
    <label htmlFor="">Name of The Book</label>
      <input type="text" placeholder="title" name="title" onChange={handleEditBook} />
    {/* <label htmlFor="">Email</label>
      <input /> */}
    <label htmlFor="">Authur</label>
      <input type="text"  placeholder="auther"  name="auther"  onChange={handleEditBook} />
    <label htmlFor="">Discreption</label>
      <input  type="text"  placeholder="description" name="description" onChange={handleEditBook} />
      <br/>
      <input type="file" style={{border:'none',borderRadius:'0'}}  placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/>
      <button type='submit'>Submit</button>
    </form>
   </div>
   </div>
        
    </>
  )
}
