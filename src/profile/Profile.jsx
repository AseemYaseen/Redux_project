import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { useDispatch } from 'react-redux'
import { logout } from '../actions/index'


export default function Profile() {

  // const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_ID = localStorage.getItem('id');

  // const user_email = localStorage.getItem('email');

  const [dataUsers, setDataUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDataUsers();

  }, []);


  const getDataUsers = () => {
    axios
      .get(`http://localhost/React/redux-project/backend/user.php/users/${current_ID}`)
      .then((response) => {
        setDataUsers(response.data);
        console.log(response.data);
      });
  };



  const handlePassword = (user) => {
    const passwordElement = document.getElementById('passWor');
    passwordElement.textContent = `Password: ${user.password}`;
  }

  return (
    <>
      <Navbar id="navBarContainer">
        <Container id="diverr">
        </Container>
        <Nav >
          <Nav.Link id="logout" href="/Home"><button id="navvv" className="home">Home</button></Nav.Link>
          <Nav.Link id="logout" href="/Profile"><button id="navvv" className="profile">Profile</button></Nav.Link>
          <Nav.Link id="logout"><button id="navvv" className="out" onClick={() => dispatch(logout())} >Logout</button></Nav.Link>
        </Nav>
      </Navbar>

      {dataUsers.map((user, index) => {

        if (user.id === parseInt(current_ID)) {
          return (
            <div className='flex'>
              <div className='userInfo'>
                <p>Name : <span>{user.name}</span></p>
                <p>Email : <span>{user.email}</span></p>
                <p id='passWor'>Password : {Array(user.password.length).fill("*").join("")}</p>
                {/* <button onClick={handlePassword(user)}>Show Password</button> */}
                <a className='EditBut' href={`/profile/${user.id}/edit`}>Edit Profile</a>
              </div>
                <div>
                  <img className='userImg' src={require(`../images/${user.image}`)} alt="" />
                </div>

            </div>
            // return <div key={user.id}>
            //   <div id="landing" style={{ paddingTop: '2vw' }}>
            //     <div className='parent'>
            //       <div className="wrapper">
            //         <div className="left">
            //           <h4>{user.name}</h4>
            //           <img src={require(`../images/${user.image}`)} alt="" />
            //         </div>
            //         <div className="right profileShow">
            //           <div className="info">
            //             <h3>a</h3>
            //             <div className="info_data">
            //               <div className="data">
            //                 <h4>Email</h4>
            //                 <p>{user.email}</p>
            //               </div>
            //             </div>
            //           </div>
            //           <div className="social_media">
            //             <div id="signInBtn">
            //               <button type="submit">
            //                 <a href={`/profile/${user.id}/edit`}>Edit</a>
            //               </button>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )
        }
      })}
    </>

  )
}
