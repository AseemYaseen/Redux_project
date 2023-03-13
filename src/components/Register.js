import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBContainer, MDBInput } from 'mdb-react-ui-kit';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError(true);
      return;
    }

    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setError(true);
      return;
    }

    const inputs = { name, email, password };

    axios.post('http://localhost/React/redux-project/backend/register.php', inputs)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('Email', email);

        navigate('/Home');
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: `url(${require('../images/books.jpg')})`}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className='text-uppercase text-center mb-5'>Create an account</h2>
          <Form onSubmit={handleSubmit}>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          {error && <p className='text-danger mb-4'>Please fill in all the required fields and provide a valid email address.</p>}
          <button type='submit' className='button' title='LogIn' value='Login'>Register</button>
          </Form>
          <p className='text-center'>
            Already have an account? <Link to='/'>Log in</Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;