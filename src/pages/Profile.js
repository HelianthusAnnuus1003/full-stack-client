import { React, useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

const Profile = () => {
    let { id } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profile/${id}`).then((res) => {
            setUser(res.data);
        });

        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((res) => {
            setPosts(res.data);
        });
    }, [id]);

    return (
        <div className="container">
            <div className="info my-5">
                <div className="row">
                    <h1 className="text-success">Username: {user.username}</h1>
                    {authState.username === user.username && (
                        <button className="btn btn-warning">
                            <Link to="/changepassword">Change Password</Link>
                        </button>
                    )}
                </div>
            </div>
            <div className="posts-container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {posts &&
                        posts.map((post, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Agi7uYUojhBRPIsyipos5jIfvczYlftMEck-FKx7JKy7DDiYVcGeVf0uS3eAMzH4AmY&usqp=CAU"
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link to={`/post/${post.id}`}>
                                                    Post {index + 1}
                                                </Link>
                                            </h5>
                                            <h5 className="card-title">
                                                {post.title}
                                            </h5>
                                            <p className="card-text">
                                                {post.content}
                                            </p>
                                            <p className="card-text">
                                                <Link
                                                    className="card-text mb-2"
                                                    style={{ display: "block" }}
                                                    to={`/profile/${post.UserId}`}
                                                >
                                                    {post.username}
                                                </Link>
                                            </p>
                                            <button className="btn btn-primary">
                                                <ThumbUpIcon className="" />
                                                <span className="mx-2 ">
                                                    {post.Likes.length}
                                                </span>
                                            </button>
                                            <p className="card-text">
                                                {post.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
