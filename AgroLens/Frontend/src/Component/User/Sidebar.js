import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../media/2.png"

function Sidebar(props) {
    const [ActivePage, setActivePage] = useState(props.activePage);
    return (
        <nav class="navbar-vertical navbar" style={{borderRight:'1px solid #668927'}} >
            <div class="nav-scroller" style={{ overflow: "hidden", 
            // backgroundColor:'#6f6e6d',
            // backgroundColor:'#624103',
            // backgroundColor:'#fead16',
            // backgroundColor:'#537020',
            borderRight: '1px solid #668927' ,
            background: 'linear-gradient(-475deg, rgb(102, 137, 39), #2e2e2e'
            // backgroundImage: (to right, rgba(255,0,0,0), rgba(255,0,0,1));
            }}>
            <img src={Logo} alt="" 
                                        style={{ height: '150px', width: "150px", marginRight: 'auto',marginLeft:'auto',display:'block',marginTop:'20px' }} 
                                        class="text-center"/>

                {/* <a class=" text-center navbar-brand" style={{ color: 'white', fontWeight: 'bold', marginTop: '10px' }}>
                    AGRO LENS
                    <hr />
                </a> */}
                {/* </Link> */}
                {/* <!-- Navbar nav --> */}
                <ul class="navbar-nav flex-column" id="sideNavbar">
                    <Link to="/admin">
                        <li class="nav-item" style={{marginTop:'150px',marginLeft:'18px',fontSize:'17px'}}>
                            <a
                                className={ActivePage == "blogs" ? "nav-link active" : "nav-link"}
                                style={{textAlign:'center'}}
                            >
                                <i class="nav-icon fe fe-home me-2" style={{textAlign:'center',color:'#fead16'}}></i> Mite Scan History
                            </a>
                        </li>
                    </Link>
                    {/* <Link to="/yourblogs">
                        <li className="nav-item" >
                            <a
                                className={ActivePage == "yourblogs" ? "nav-link active" : "nav-link"}
                            >
                                <i class="nav-icon fe fe-book-open me-2"></i> Your Blogs
                            </a>
                        </li>
                    </Link> */}
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;