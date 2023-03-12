import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    const navigation = useNavigate();

    useEffect(() => {
        if (!authState.status) {
            navigation("/login");
        } else {
            axios
                .get("http://localhost:3001/posts", {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
                    setPosts(res.data.listOfPosts);
                    setLikedPosts(
                        res.data.likedPosts.map((like) => like.PostId)
                    );
                });
            navigation("/");
        }
    }, []);

    const likeAPost = (postId) => {
        axios
            .post(
                `http://localhost:3001/likes`,
                {
                    PostId: postId,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                setPosts(
                    posts.map((item) => {
                        if (item.id === postId) {
                            if (res.data.liked) {
                                return { ...item, Likes: [...item.Likes, 0] };
                            } else {
                                const likesArray = item.Likes;
                                likesArray.pop();
                                return { ...item, Likes: likesArray };
                            }
                        } else {
                            return item;
                        }
                    })
                );
            });

        if (likedPosts.includes(postId)) {
            setLikedPosts(
                likedPosts.filter((id) => {
                    return id !== postId;
                })
            );
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };

    return (
        <div className="pt-5 bg-info-subtle">
            <h1>Home Page</h1>
            <br />
            <div className="container text-center">
                <h3 className="mb-3 text-bold">List Of Posts</h3>
                {posts &&
                    posts.map((post, index) => {
                        return (
                            <div
                                className="card text-center mt-5 text-white text-bg-warning m-auto"
                                key={index}
                                style={{ maxWidth: "20rem" }}
                            >
                                <div className="card-header text-white bg-danger">
                                    <Link to={`/post/${post.id}`}>
                                        Post {index + 1}
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <Link
                                        className="card-text mb-2"
                                        style={{ display: "block" }}
                                        to={`/profile/${post.UserId}`}
                                    >
                                        {post.username}
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        style={
                                            likedPosts.includes(post.id)
                                                ? { opacity: "1" }
                                                : { opacity: "0.7" }
                                        }
                                        onClick={() => likeAPost(post.id)}
                                    >
                                        <ThumbUpIcon className="" />
                                        <span className="mx-2 ">
                                            {post.Likes.length}
                                        </span>
                                    </button>
                                </div>
                                <div className="card-footer bg-success">
                                    {post.createdAt}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Home;
