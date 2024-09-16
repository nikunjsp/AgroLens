import React, { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Logo from "../../media/1.png"


const Login = () => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const { loginUser } = useUser();
    const [loginError, setLoginError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

//    const handleLogin = ()=>{
//     console.log("loging successfull")
//     console.log(Username,Password,)
//    }

const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8000/login/', {
            username: Username,
            password: Password
        });

        // Assuming your API returns a token upon successful login
        const token = response.data.token;
        const name=response.data.user.username
        console.log(name)

        // Save token to local storage or session storage for authentication
        localStorage.setItem('token', token);
        localStorage.setItem('username',name);

        // Set the user as logged in
        setIsLoggedIn(true);

        // Call loginUser function from the context to update user state
        loginUser();

        // Redirect to another page upon successful login
        // You can use Navigate component from react-router-dom
        // Example: <Navigate to="/dashboard" replace={true} />
    } catch (error) {
        // Handle login errors
        console.error('Login failed:', error.response.data.detail);
        setLoginError('Invalid username or password');
    }
};

    return (
        <>
            {
                isLoggedIn ? <Navigate to="/user-dashboard" replace={true}></Navigate> :
                    <div class="container d-flex flex-column">
                        <div class="row align-items-center justify-content-center g-0 min-vh-100" >
                            <div class="col-lg-5 col-md-8 py-8 py-xl-0" style={{ width: '600px' }}>
                                <div class="card shadow" style={{ marginTop: '100px', marginBottom: '100px' }}>
                                    <div class="card-body p-6" >
                                        <div class="mb-4">
                                        <img src={Logo} alt="" 
                                        style={{ height: '100px', width: "100px", marginRight: 'auto',marginLeft:'auto',display:'block' }} 
                                        class="text-center"/>
                                            <h1 class="mb-1 fw-bold">Sign in</h1>
                                            <span>
                                                Don’t have an account?{" "}
                                                <a href="/" class="ms-1" style={{color:'#668927'}}>
                                                    Sign up
                                                </a>
                                            </span>
                                        </div>
                                        <form >
                                            <Row>
                                                <Col>
                                                    <div className="mb-3">
                                                        <label style={{ color: 'black' }}
                                                            className="form-label"
                                                            htmlFor="Username"
                                                        >
                                                            Username
                                                        </label>
                                                        <input
                                                            required
                                                            type="text"
                                                            className="form-control floating"
                                                            id="Username"
                                                            placeholder="Username"
                                                            name="Username"
                                                            onChange={(e) => {
                                                                setUsername(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="mb-3">
                                                        <label style={{ color: 'black' }}
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                            required
                                                            type="password"
                                                            className="form-control floating"
                                                            id="password"
                                                            placeholder="Password"
                                                            name="password"
                                                            onChange={(e) => {
                                                                setPassword(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row >
                                                <Button variant="primary" onClick={handleLogin} style={{backgroundColor:'#668927', color:'white', border: '1px solid #668927'}}>Login</Button>
                                            </Row>
                                            {/* {loginError && <p className="text-danger">{loginError}</p>} */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Login
