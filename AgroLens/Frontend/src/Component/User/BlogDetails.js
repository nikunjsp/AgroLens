import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../User/Sidebar'
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {

    const { postId } = useParams();
    const [blogDetails, setBlogDetails] = useState({
        id:1,
        title:"frame1",
        creationDate:"2024-02-26",
        username:"admin"
        
        

    });
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [username, setusername] = useState('');

    // useEffect(() => {
    //     // Fetch the token from local storage when the component mounts
    //     const storedToken = localStorage.getItem('username');
    //     setusername(storedToken || ''); // Set the token to an empty string if it doesn't exist
    // }, []);

    // useEffect(() => {
    //     const fetchBlogDetails = async () => {
    //         try {
    //             // Make a GET request to fetch the details of the specific blog post
    //             const response = await axios.get(`http://localhost:3000/api/blogposts/${postId}`);
    //             setBlogDetails(response.data);
    //         } catch (error) {
    //             console.error('Error fetching blog details:', error.message);
    //         }
    //     };


    //     const fetchComments = async () => {
    //         try {
    //             // Make a GET request to fetch all comments for the specific blog post
    //             const response = await axios.get(`http://localhost:3000/api/blog-posts/${postId}/comments`);
    //             setComments(response.data);

    //         } catch (error) {
    //             console.error('Error fetching comments:', error.message);
    //         }
    //     };


    //     fetchBlogDetails();
    //     fetchComments();
    // }, [postId]);

    // const handleComment = async () => {

    //     try {
    //         const token = localStorage.getItem('token'); 
    //         if (!token) {
    //             console.error('Authentication token not found');
    //             return;
    //         }

    //         // Make a POST request to add a comment
    //         const response = await axios.post(
    //             `http://localhost:3000/api/blog-posts/${postId}/comments`,
    //             { text: comment }, 
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         // Update the comments state with the new comment
    //         setComments([...comments, response.data]);
    //         setComment(''); // Clear the comment input field
    //         handleClose(); // Close the comment modal

    //     } catch (error) {
    //         console.error('Error adding comment:', error.message);
    //     }
    // };

    // const handleDeleteComment = async (commentId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) {
    //             console.error('Authentication token not found');
    //             return;
    //         }

    //         // Make a DELETE request to delete the comment
    //         await axios.delete(`http://localhost:3000/api/blog-posts/${postId}/comments/${commentId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         // Update the comments state to reflect the deletion
    //         setComments(comments.filter((comment) => comment._id !== commentId));
    //     } catch (error) {
    //         console.error('Error deleting comment:', error.message);
    //     }
    // };


    // const [show, setShow] = useState(false);
    // const [Iscomment, setIscomment] = useState(false);

    // const handleCommentbox = () => setIscomment(!Iscomment);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>What's your thought on this Blog !!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col>
                                <div className="mb-3">
                                    <label style={{ color: 'black' }}
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        Comment
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control floating"
                                        id="comment"
                                        placeholder="Add your comment here"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleComment}>
                        Add comment
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <div id="db-wrapper">
                <Sidebar activePage="blogs" />
                <div id="page-content">
                    <Header />
                    <div class="container-fluid p-4">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-12">
                                <div class="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                                    <div class="mb-3 mb-md-0">
                                        <h1 class="mb-1 h2 fw-bold">Scan</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center justify-content-center g-0" >
                                <div class="col-lg-5 col-md-8 py-8 py-xl-0" style={{ width: '100%' }}>
                                    <div class="card shadow">
                                        <div class="card-body p-6" >
                                            <div class="mb-4">
                                                <h1 class="mb-1 fw-bold">{blogDetails.title}</h1>
                                                <span>
                                                    Scaned by:  {blogDetails.author && blogDetails.username}
                                                </span>
                                            </div>
                                            <div>
                                                Total Mite Count: 1
                                            </div>
                                            x`{/* <div style={{ alignItems: 'center', marginTop: '20px' }}>
                                                <Row>
                                                    <Button variant="primary" style={{ alignItems: 'right' }}
                                                        onClick={handleCommentbox}
                                                    >see comments</Button>
                                                </Row>
                                            </div> */}
                                            <hr />
                                            {/* {Iscomment ?
                                                <div>
                                                    <h4 class="mb-1 fw-bold">Comments</h4>
                                                    <table class="table mb-0 text-nowrap">
                                                        <tbody>
                                                            {comments.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td class="align-middle border-top-0">
                                                                            <a class="text-inherit">
                                                                                <div class="d-lg-flex align-items-center">
                                                                                    <div class="ms-lg-3 mt-2 mt-lg-0">
                                                                                        <h4 class="mb-1 ">
                                                                                            {item.commentText}
                                                                                        </h4>
                                                                                        <span class="text-inherit">By {item.commenterName}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </td>
                                                                        {item.commenterName==username?
                                                                        <td onClick={() => handleDeleteComment(item._id)}><i class="fa fa-trash"></i></td>:null}
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                    <div style={{ alignItems: 'right', marginTop: '20px' }}>
                                                        <Button
                                                            onClick={handleShow}
                                                        >add comments</Button>
                                                    </div>
                                                </div> : null} */}
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


export default BlogDetails