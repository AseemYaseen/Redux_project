import React, { useState, useEffect } from "react";
import {Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'
import './novel.css'
import './AddNovel.css'

function AddBook() {

    const current_ID = 1 ;
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [auther, setAuther] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const dispatch=useDispatch();
    const [novels, setNovels] = useState([]);

    function getNovels() {
      axios.get(`http://localhost/React/redux-project/backend/novels.php`).then((response) => { console.log(response.data)
          setNovels(response.data);
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("auther", auther);
        formData.append("description", description);
        formData.append("user_id", current_ID);
        formData.append("file", file);
    
        try {
          const response = await axios.post(
            "http://localhost/React/redux-project/backend/books.php",
            formData
          );
          console.log(response.data);
          navigate('/home');
        } catch (error) {
          console.error(error);
        }
      };

    

  return (
      <>
        <Navbar id="navBarContainer">
        <Container id="diverr">
        </Container>
            <Nav >
            <Nav.Link id="logout" href="/Home"><button id="navvv">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="navvv">Profile</button></Nav.Link>    
            <Nav.Link id="logout" href="#home"><button id="navvv" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>    
            </Nav>
        </Navbar>
        <div id="landing">
            <p style={{visibility : "hidden"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>
            <div id="diver"><h1 className="text-center font-bold text-2xl" id="head">Add A Book<br/></h1></div>

            <div id= "formm">
                <section className="section_form">
                    <form id="consultation-form" className="feed-form" onSubmit={handleSubmit}>
                        <input  name="title" placeholder="Title" type="text" id="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />
                        <input  name="title" placeholder="Auther" type="text" id="text" value={auther} onChange={(e) => setAuther(e.target.value)} /><br /><br />
                        <input name="description" style={{height: '6vw'}}  placeholder="Description"  type="text" id="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />
                        <input type="file"  name="img" id="file" accept="image/*"  onChange={(e) =>setFile(e.target.files[0])} hidden/>
                        <label className="label" htmlFor="file">
                            <p id="imgLabel">Add Image</p>
                        </label>
                        <br/>
                        <button id="addNovelDB" type="submit">Submit</button>
                    </form>
                </section>
            </div>
        </div>
        
    </>
  )
}

export default AddBook