        import React, { useEffect, useState } from 'react'
        import { Row, Col } from "react-bootstrap";
        import Button from 'react-bootstrap/Button';
        import ButtonGroup from 'react-bootstrap/ButtonGroup';
        import Modal from 'react-bootstrap/Modal';
        import Sidebar from '../User/Sidebar'
        import { NavLink } from 'react-router-dom'
        import Header from './Header';
        import axios from 'axios';

        const UserBlog = () => {

            const [userBlogs, setUserBlogs] = useState([]);
            const [selectedBlog, setSelectedBlog] = useState(null);

            useEffect(() => {
                const fetchUserBlogs = async () => {
                    try {
                        const response = await axios.get('http://localhost:3000/api/user-blogs', {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                            },
                        });
                        setUserBlogs(response.data);
                    } catch (error) {
                        console.error('Error fetching user blogs:', error.message);
                    }
                };
                fetchUserBlogs();
            }, [userBlogs]); 


            const [show, setShow] = useState(false);
            const [showdelete, setShowdelete] = useState(false);

            const [title, setTitle] = useState('');
            const [content, setContent] = useState('');
            const [tags, setTags] = useState('');

            const handleClose = () => setShow(false);
            const handleClosedelete = () => setShowdelete(false);
            const handleShow = () => setShow(true);

            const createBlog = async () => {
                try {
                    const token = localStorage.getItem('token'); 
                    if (!token) {
                        console.error('Authentication token not found');
                        return;
                    }

                    const response = await axios.post(
                        'http://localhost:3000/api/blog-posts',
                        {
                            title,
                            content,
                            tags,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token ? `Bearer ${token}` : '',
                            },
                        }
                    );

                    console.log('Blog created successfully:', response.data);
                } catch (error) {
                    console.error('Error adding blog:', error.message);
                }
            };

            const handleCreateBlog = () => {
                createBlog();
                handleClose(); 

            };


            const handleEditBlog = (blog) => {
                setSelectedBlog(blog);
              };

            const handleDeleteBlog = async (blogId) => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        console.error('Authentication token not found');
                        return;
                    }

                    await axios.delete(`http://localhost:3000/api/blog-posts/${blogId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Update the userBlogs state to reflect the deletion
                    setUserBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
                } catch (error) {
                    console.error('Error deleting blog:', error.message);
                }
            };

            return (
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Blog Details.</Modal.Title>
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
                                                Title
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                className="form-control floating"
                                                id="title"
                                                placeholder="Title"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="mb-3">
                                            <label style={{ color: 'black' }}
                                                className="form-label"
                                                htmlFor="content"
                                            >
                                                Content
                                            </label>
                                            <textarea
                                                required
                                                type="text"
                                                rows={5}
                                                className="form-control floating"
                                                id="content"
                                                placeholder="Content"
                                                name="content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="mb-3">
                                            <label style={{ color: 'black' }}
                                                className="form-label"
                                                htmlFor="tags"
                                            >
                                                Tags
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control floating"
                                                id="tags"
                                                placeholder="Tags"
                                                name="tags"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCreateBlog}>
                                Add Blog
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showdelete} onHide={handleClosedelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete The Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the Blog!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosedelete}>
                                No
                            </Button>
                            <Button variant="primary"
                                onClick={handleClosedelete}
                            >
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div id="db-wrapper">
                        <Sidebar activePage="yourblogs" />
                        <div id="page-content">
                            <Header />
                            <div class="container-fluid p-4">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-12">
                                        <div class="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                                            <h1 class="mb-1 h2 fw-bold">Your Blogs</h1>
                                            <div class="ms-auto mb-3 mb-md-0" onClick={handleShow}><a className="btn btn-primary">Create Blog</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-12">
                                        <div class="card rounded-3">
                                            <div class="card-header border-bottom-0 p-0 bg-white">
                                                <div>
                                                    <ul class="nav nav-lb-tab" id="tab" role="tablist">
                                                        <li class="nav-item">
                                                            <a class={
                                                                'nav-link active'
                                                            } id="courses-tab" data-bs-toggle="pill" role="tab" style={{ cursor: 'pointer' }} aria-controls="courses" aria-selected="true"
                                                            >All Your Blogs</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                           
                                            <div>
                                                <div class="tab-content" id="tabContent" >
                                                    <div class={
                                                        'tab-pane fade show active'
                                                    } id="courses" role="tabpanel" aria-labelledby="courses-tab">
                                                        <div class="table-responsive border-0 overflow-y-hidden">
                                                            <table class="table mb-0 text-nowrap">
                                                                <thead class="table-light">
                                                                    <tr>
                                                                        <th scope="col" class="border-0 text-uppercase">
                                                                            Blogs
                                                                        </th>
                                                                        <th scope="col" class="border-0 text-uppercase">
                                                                            Author
                                                                        </th>
                                                                        <th scope="col" class="border-0 text-uppercase">
                                                                            Action
                                                                        </th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {userBlogs.map((blog) => {
                                                                        return (
                                                                            <tr key={blog._id}>
                                                                                <td class="align-middle border-top-0">
                                                                                    <a class="text-inherit">
                                                                                        <div class="d-lg-flex align-items-center">

                                                                                            <div class="ms-lg-3 mt-2 mt-lg-0">
                                                                                                <NavLink to={`/blogdetails/${blog._id}`}>
                                                                                                    <h4 class="mb-1 text-primary-hover">
                                                                                                        {blog.title}
                                                                                                    </h4></NavLink>
                                                                                                <span class="text-inherit">Added on {blog.creationDate}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </td>
                                                                                <td class="align-middle border-top-0">
                                                                                    <div class="d-flex align-items-center">

                                                                                        <h5 class="mb-0">{blog.author.username}</h5>
                                                                                    </div>
                                                                                </td>


                                                                                <td class="align-middle border-top-0">
                                                                                    <div class="d-flex align-items-center">
                                                                                        <ButtonGroup  >
                                                                                            <NavLink to={`/editblogs/${blog._id}`
                                                                                            }

                                                                                            onClick={() => handleEditBlog(blog)}
                                                                                            >  <Button style={{ backgroundColor: '#FBC200  ' }} >Edit</Button></NavLink>
                                                                                            <Button style={{ backgroundColor: '#F2421C  ' }}
                                                                                                onClick={() => handleDeleteBlog(blog._id)}
                                                                                            >Delete</Button>
                                                                                        </ButtonGroup>
                                                                                        
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
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

        export default UserBlog