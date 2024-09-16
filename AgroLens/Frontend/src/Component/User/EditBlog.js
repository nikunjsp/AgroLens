import React, { useState,useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Sidebar from '../User/Sidebar'
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const EditBlog = () =>  {

    const { blogId } = useParams();
    const [blogDetails, setBlogDetails] = useState([]);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                // Make a GET request to fetch the details of the specific blog post
                const response = await axios.get(`http://localhost:3000/api/blogposts/${blogId}`);
                setBlogDetails(response.data);
            } catch (error) {
                console.error('Error fetching blog details:', error.message);
            }
        };

        fetchBlogDetails();
    }, [blogId]);
    
    const [editedTitle, setEditedTitle] = useState(blogDetails.title);
    const [editedContent, setEditedContent] = useState("");
    const [editedTags, setEditedTags] = useState('');


    const handleUpdateBlog = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Authentication token not found');
                return;
            }

            const response = await axios.put(
                `http://localhost:3000/api/blog-posts/${blogId}`,
                {
                    title: editedTitle,
                    content: editedContent,
                    tags: editedTags
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Blog updated successfully:', response.data);
            // Add logic to handle the updated blog, e.g., redirect or update state
        } catch (error) {
            console.error('Error updating blog:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

 
    return (
        <>
            <div id="db-wrapper">
                <Sidebar></Sidebar>
                <div id="page-content">
                    <Header />
                    <div class="container-fluid p-4">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-12">
                                <div class="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                                    <div class="mb-3 mb-md-0">
                                        <h1 class="mb-1 h2 fw-bold">Edit Blogs</h1>
                                    </div>
                                </div>
                            </div>

                            <div class="row align-items-center justify-content-center g-0" >
                                <div class="col-lg-5 col-md-8 py-8 py-xl-0" style={{ width: '100%' }}>
                                    <div class="card shadow">
                                        <div class="card-body p-6" >
                                            <div class="mb-4">
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
                                                                    
                                                                    type="text"
                                                                    className="form-control floating"
                                                                    id="title"
                                                                    placeholder="Title"
                                                                    name="title"
                                                                    value={editedTitle}
                                                                    onChange={(e) => setEditedTitle(e.target.value)}
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
                                                                    type="text"
                                                                    rows={5}
                                                                    className="form-control floating"
                                                                    id="content"
                                                                    placeholder="Content"
                                                                    name="content"
                                                                    value={editedContent}
                                                                    onChange={(e) => setEditedContent(e.target.value)}
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
                                                                    value={editedTags}
                                                                    onChange={(e) => setEditedTags(e.target.value)}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                            <div style={{ alignItems: 'center', marginTop: '20px' }}>
                                                <Row>
                                                    <Link to="/yourblogs"> <Button variant="primary" style={{ alignItems: 'right' }}
                                                        onClick={handleUpdateBlog}
                                                    >Update Blog</Button>
                                                    </Link>
                                                </Row>
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

export default EditBlog