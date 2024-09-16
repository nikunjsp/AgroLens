import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';


const ScanHistory = () => {
    const [blogPosts, setBlogPosts] = useState(
        [ {
            id: 1,
            title: "video1",
            creationDate: "2024-02-26",
            count: 5,
            username: "admin",
        },
        {
            id: 1,
            title: "video2",
            creationDate: "2024-02-26",
            count: 2,
            username: "admin",
        },
        {
            id: 1,
            title: "video3",
            creationDate: "2024-02-26",
            count: 10,
            username: "admin",
        }
    ]
    );
    const [searchValue, setSearchValue] = useState('');


    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_video/');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error.message);
            }
        };

        fetchVideos();
    }, []);

    const storedToken = localStorage.getItem('username');

    
    return (
        <>




            <div id="db-wrapper">
                <Sidebar activePage="blogs" />
                <div id="page-content">
                    <Header />
                    <div class="container-fluid p-4">
                        <div class="row">
                            
                            <div class="row">
                                    <div class="col-lg-12 col-md-12 col-12">
                                        <div class="pb-4 mb-4 d-md-flex align-items-center justify-content-between" style={{borderBottom:'1px solid rgb(102, 137, 39)'}}>
                                            <h1 class="mb-1 h2 fw-bold">Mite Scans</h1>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-12">
                                <div class="card rounded-3">
                                    <div class="card-header border-bottom-0 p-0 bg-white">
                                        <div>
                                            <ul class="nav nav-lb-tab" id="tab" role="tablist" style={{borderBottom:'2px solid #537020'}}>
                                                <li class="nav-item">
                                                    <a class={
                                                        'nav-link active'
                                                    } id="courses-tab" data-bs-toggle="pill" role="tab" style={{ cursor: 'pointer',color:'#537020',borderBottom:"0px solid " }}  aria-controls="courses" aria-selected="true"

                                                    >All User's Scans</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div class="tab-content" id="tabContent" >
                                            <div class={'tab-pane fade show active'} id="courses" role="tabpanel" aria-labelledby="courses-tab">
                                                <div class="table-responsive border-0 overflow-y-hidden">
                                                    <table class="table mb-0 text-nowrap">
                                                        <thead class="table-light">
                                                            <tr>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    Scan
                                                                </th>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    Count
                                                                </th>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    User
                                                                </th>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    Date
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* {blogPosts.map((post, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td class="align-middle border-top-0">
                                                                            <a class="text-inherit">
                                                                                <div class="d-lg-flex align-items-center">

                                                                                    <div class="ms-lg-3 mt-2 mt-lg-0">
                                                                                        <NavLink to={`/blogdetails/${post.id}`}>
                                                                                            <h4 class="mb-1 text-primary-hover">
                                                                                                {post.title}
                                                                                            </h4></NavLink>
                                                                                        <span class="text-inherit">Scaned on {post.creationDate}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </td>
                                                                        <td class="align-middle border-top-0">
                                                                            <div class="d-flex align-items-center">

                                                                                <h5 class="mb-0">{post.count}</h5>
                                                                            </div>
                                                                        </td>
                                                                        <td class="align-middle border-top-0">
                                                                            <div class="d-flex align-items-center">

                                                                                <h5 class="mb-0">{post.username}</h5>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })} */}
                                                             {videos.map((video, index) => (
                                                        <tr key={index}>
                                                            <td className="align-middle border-top-0">
                                                                <a href="#" className="text-inherit">
                                                                    <div className="d-lg-flex align-items-center">
                                                                        <div className="ms-lg-3 mt-2 mt-lg-0">
                                                                            <h4 className="mb-1 text-primary-hover">{video.video_file}</h4>
                                                                            <span className="text-inherit">Scaned on {video.date}</span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.count}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.username}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.date}</h5>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScanHistory


