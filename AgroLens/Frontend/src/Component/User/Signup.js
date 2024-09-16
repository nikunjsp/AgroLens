import React, { useState } from 'react'
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Logo from "../../media/1.png"

const Signup = () => {

    const { loginUser } = useUser();

    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [Error, setError] = useState("");

   

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8000/signup/', {
                username: UserName,
                email: Email,
                password: Password
            });
            setSignupSuccess(true);
            console.log('Signup successful:', response.data);
            
        } catch (error) {
            console.error('Signup error:', error.response.data);
            setError(error.response.data.detail); // Assuming error response contains a 'detail' field
        }
    };


    return (
        <>
            {
                signupSuccess ? <Navigate to="/user-login" replace={true}></Navigate> :
                    // true?
                    <div class="container d-flex flex-column">
                        <div class="row align-items-center justify-content-center g-0 min-vh-100" >
                            <div class="col-lg-5 col-md-8 py-8 py-xl-0" style={{ width: '600px' }}>
                                <div class="card shadow" style={{ marginTop: '100px', marginBottom: '100px' }}>
                                    <div class="card-body p-6" >
                                        <div class="mb-4">
                                        <img src={Logo} alt="" 
                                        style={{ height: '100px', width: "100px", marginRight: 'auto',marginLeft:'auto',display:'block' }} 
                                        class="text-center"/>
                                            <h1 class="mb-1 fw-bold" >Sign up</h1>
                                            <span>Already have an account?
                                                <a href="/user-login" class="ms-1" style={{color:'#668927'}}>Sign in</a></span>
                                        </div>
                                        <form >
                                            <Row>
                                                <Col>
                                                    <div className="mb-3">
                                                        <label style={{ color: 'black' }}
                                                            className="form-label"
                                                            htmlFor="username"
                                                        >
                                                            Username
                                                        </label>
                                                        <input
                                                            required
                                                            type="text"
                                                            className="form-control floating"
                                                            id="username"
                                                            placeholder="Username"
                                                            name="username"
                                                            onChange={(e) => {
                                                                setUserName(e.target.value)
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
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            required
                                                            type="email"
                                                            className="form-control floating"
                                                            id="email"
                                                            placeholder="Email"
                                                            name="email"
                                                            onChange={(e) => {
                                                                setEmail(e.target.value)
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
                                            <Row>
                                                <Button variant="primary" onClick={handleSignup} style={{backgroundColor:'#668927', color:'white', border: '1px solid #668927'}}>Sign up</Button>
                                            </Row>
                                            {/* {signupError && <p className="text-danger">{signupError}</p>} */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    // :null
            }
        </>

    )
}

export default Signup
