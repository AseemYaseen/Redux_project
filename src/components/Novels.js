import React, { useState, useEffect } from "react";
import {Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'
import './novel.css'

function Novels() {
    const dispatch=useDispatch();
    const [novels, setNovels] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      getNovels();
    }, []);

    function getNovels() {
      axios.get(`http://localhost/React/redux-project/backend/novels.php`).then((response) => {
          setNovels(response.data);
          
        })
    }
    
    const deleteBook = (id) => {
      axios.delete(`http://localhost:80/React/redux-project/backend/books.php/${id}/delete`).then((response)=>{
        navigate('/home')
      })
    }

    function getSearch(e) {
      e.preventDefault();
      axios.get(`http://localhost/React/redux-project/backend/search.php/${search}`).then((response)=>{
      setNovels(response.data)
      console.log(novels);
})
      
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value)
    }

    return (
   <>
    <Navbar id="navBarContainer">
      <Container>
        <Navbar.Brand><form onSubmit={getSearch}><input id="search" placeholder="Search  ..." onChange={handleSearch} type="text"/><br/><button type="submit" id="add" >Search</button></form></Navbar.Brand>
      </Container>
      <Container id="diverr">
      </Container>
        <Nav >
            <Nav.Link id="logout" href="/Home"><button id="navvv" className="home">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="navvv" className="profile">Profile</button></Nav.Link>    
            <Nav.Link id="logout"><button id="navvv" className="out" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>     
        </Nav>
    </Navbar>
    <div id="landing">
      <p style={{visibility : "hidden"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>
      <Navbar.Brand><a href="/addBook"><button id="add" style={{marginBottom : '2vw' ,marginRight : '1vw' , height : "4vw" , fontSize : '18px' , width : '125px'}}>Add A Book</button></a></Navbar.Brand>
      <div id="diver">
        <h1 className="text-center font-bold text-2xl" id="head">Books</h1>
      </div>
      <div className="align-item center figureWEB">
        {novels.map((item , index)=>{
          return(
            <div style={{marginBottom: '4vw'}}>
              <img src={require(`../images/${item.image}`)} class='bookImages' alt="..." />
              <p className="AuthorName" >{item['name']} - written by : {item.author}</p>
              <p className="descriptionSt" >{item['description']}</p>
              <button onClick={() => deleteBook(item.id)}>Delete</button>
              <button onClick={() => navigate(`/EditBook/${item.id}/edit`)}>Edit</button>
            </div>
            )
        })}
      </div>   
   </div>
   </>
    )
}

export default Novels;

