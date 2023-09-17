import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginSucces } from '../store/user'; 

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [error, SetError] = useState(false);
    const userNameRef = useRef();
    const userPasswordRef = useRef();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username', userNameRef.current.value);
        console.log('userPasswordRef', userPasswordRef.current.value);
        try {
          const res = await axios.post('http://localhost:5000/auth/login', {
            userName: userNameRef.current.value,
            password: userPasswordRef.current.value,
          });
          console.log(res);
          SetError(false);
          navigate('/');
          dispatch(loginSucces(res.data));
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch(err) {
          if (err.response.data.message === 'INVALID_USERNAME') {
            SetError(true)
          } else if (err.response.data.message === 'INVALID_PASSWORD') {
              SetError(true)
          }
          console.log(err);
        }
    }
  return (
    <Form className="container mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={userNameRef} type="text" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={userPasswordRef} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {error && (
        <Alert className="mt-2" key="danger" variant="danger">
          Please verify your username/password !
        </Alert>
      )}
    </Form>
  );
}

export default Login;