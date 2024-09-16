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

    const storedToken = localStorage.getItem('username');

    

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get_video/');
            const userVideos = response.data.filter(video => video.username === storedToken);
            setVideos(userVideos);
        } catch (error) {
            console.error('Error fetching videos:', error.message);
        }
    };

    // fetchVideos();




    const handleUpload = () => {
        const formData = new FormData();
        formData.append('video_file', selectedFile);
        formData.append('username',storedToken)
        formData.append('count_feder',0)
        formData.append('count_pred',0)


        axios.post('http://localhost:8000/upload_video/', formData)
            .then(response => {
                // Handle successful upload
                console.log('Video uploaded successfully:', response.data);
            })
            .catch(error => {
                // Handle upload error
                console.error('Error uploading video:', error);
            });

            handleClose();
            fetchVideos()
    };
   
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>

<Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New video to scan mite count.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <Row>
                                    <Col>
                                        <div className="mb-3">
                                            <label style={{ color: 'black' }}
                                                className="form-label"
                                                htmlFor="title"
                                            >
                                                Video
                                            </label>
                                            <input
                            type="file"
                            accept="video/*"
                            className="form-control floating"
                                                id="title"
                                                
                                                name="title"
                            onChange={handleFileChange}
                        />
                                            {/* <input
                                                required
                                                type="file" accept="image/*;capture=camera"
                                                className="form-control floating"
                                                id="title"
                                                
                                                name="title"
                                             
                                            /> */}
                                        </div>
                                    </Col>
                                </Row>
                                
                                
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" 
                            // onClick={handleClose}
                            onClick={handleUpload}
                            style={{backgroundColor:'#668927', color:'white', border: '1px solid #668927'}}
                            >
                                Scan Mite
                            </Button>
                        </Modal.Footer>
                    </Modal>


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
                                            <div class="ms-auto mb-3 mb-md-0" onClick={handleShow} ><a className="btn btn-primary" style={{
                                                backgroundColor:'#668927',
                                                // background: 'linear-gradient(-475deg, rgb(102, 137, 39), #2e2e2e', 
                                                color:'white', border: '1px solid #668927'}}>Scan Mite</a>
                                            </div>
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
                                                <li class="nav-item" >
                                                    <a class={
                                                        'nav-link active'
                                                    } id="courses-tab" data-bs-toggle="pill" role="tab" style={{ cursor: 'pointer',color:'#537020',borderBottom:"0px solid " }} aria-controls="courses" aria-selected="true"

                                                    >All Your Scans</a>
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
                                                                    Predator Count
                                                                </th>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    Feeder Count
                                                                </th>
                                                                <th scope="col" class="border-0 text-uppercase">
                                                                    User
                                                                </th>
                                                                {/* <th scope="col" class="border-0 text-uppercase">
                                                                    Date
                                                                </th> */}

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
                                                        <tr key={index} >
                                                            <td className="align-middle border-top-0">
            <a href="#" className="text-inherit">
                <div className="d-lg-flex align-items-center">
                    <div className="ms-lg-3 mt-2 mt-lg-0">
                        <h4 className="mb-1 text-primary-hover" style={{ color: 'black', transition: 'color 0.3s' }}>{video.video_file}</h4>
                        <span className="text-inherit">Scaned on {video.date}</span>
                    </div>
                </div>
            </a>
        </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.count_pred}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.count_feder}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.username}</h5>
                                                                </div>
                                                            </td>
                                                            {/* <td className="align-middle border-top-0">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="mb-0">{video.date}</h5>
                                                                </div>
                                                            </td> */}
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


