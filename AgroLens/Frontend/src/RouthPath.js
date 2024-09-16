import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import UserSignup from './Component/User/Signup';
import UserLogin from './Component/User/Login';
import Sidebar from './Component/User/Sidebar';
import ScanHistory from './Component/User/ScanHistory';
import AdminDashboard from './Component/User/AdminDashboard';
import BlogDetails from './Component/User/BlogDetails';
import UserBlog from './Component/User/UserBlog';
import EditBlog from './Component/User/EditBlog';
import Extra from './Component/User/Extra';



function RouthPath() {
    return (
        <>
        <Router>
            <Routes>
                <Route exact path="/" element={<UserSignup />} />
                <Route exact path="/user-login" element={<UserLogin />} />
                <Route path="/sidebar" element={<Sidebar />} />
                <Route path="/user-dashboard" element={<ScanHistory />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
        </>
    )
}

export default RouthPath
