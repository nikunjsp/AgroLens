import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Extra = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_video/');
                setVideos(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Video List</h1>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        {/* <p>Title: {video.title}</p> */}
                        <p>Count: {video.count}</p>
                        <p>Username: {video.username}</p>
                        <p>Date: {video.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Extra;
