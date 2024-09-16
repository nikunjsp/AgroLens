import React, { useState, useEffect } from 'react'
import Logo from "../../media/images/brand/logo/profile.png"
import { NavLink } from 'react-router-dom'
import { useUser } from './UserContext';


function Header() {
    const { user, logoutUser } = useUser();
    const [username, setusername] = useState('');

    useEffect(() => {
        // Fetch the token from local storage when the component mounts
        const storedToken = localStorage.getItem('username');
        setusername(storedToken || ''); // Set the token to an empty string if it doesn't exist
    }, []);

    return (
        <>
            <div class="header">
                {/* <!-- navbar --> */}
                <nav class="navbar-default navbar navbar-expand-lg">
                {/* <a
              id="nav-toggle"
              href="#"
              onClick={(e) => {
                document
                  .getElementById("db-wrapper")
                  .classList.toggle("toggled");
              }}
            >
              <i class="fe fe-menu"></i>
            </a> */}
                    <div class="ms-lg-3 d-none d-md-none d-lg-block">
                    </div>
                    <img src={Logo} alt="" style={{ height: '35px', marginRight: '10px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {username}
                    </span>

                    <div className="ms-auto mt-3 mt-lg-0" >
                        <NavLink to="/user-login">
                            <a
                                className="btn btn-primary"
                                onClick={() => {
                                    // Clear user information on logout
                                    logoutUser();
                                    // Optionally, you may want to clear the token from local storage
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                }}
                                style={{backgroundColor:"#fbbc43", color:'black', border:'1px solid #fbbc43'}}
                            >
                                Sign Out
                            </a></NavLink>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header