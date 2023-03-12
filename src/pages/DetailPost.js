import { useEffect, useState, React, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import { AuthContext } from "../helpers/AuthContext";

const DetailPost = () => {
    const navigation = useNavigate();
    const { authState } = useContext(AuthContext);
    const [post, setPost] = useState({});
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/post/${id}`).then((res) => {
            setPost(res.data);
        });
    }, [id]);

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error);
                } else {
                    navigation("/");
                }
            });
    };

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title: ");
            axios.put(
                `http://localhost:3001/posts/title`,
                {
                    newTitle: newTitle,
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            );

            setPost({ ...post, title: newTitle });
        } else {
            let newContent = prompt("Enter New Content: ");
            axios.put(
                `http://localhost:3001/posts/content`,
                {
                    newContent: newContent,
                    id: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            );
            setPost({ ...post, content: newContent });
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <img
                        src="https://as2.ftcdn.net/v2/jpg/02/37/34/39/1000_F_237343974_loeVshtaj3SvqIy7GCmybWXawQezJV1u.jpg"
                        className="img-fluid rounded"
                        alt="..."
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-12 mt-5">
                    {post && (
                        <>
                            <div className="card">
                                <h5 className="card-header">
                                    DetailPost {post.id}
                                </h5>
                                <div className="card-body">
                                    <h5
                                        className="card-title"
                                        onClick={() => {
                                            if (
                                                authState.username ===
                                                post.username
                                            ) {
                                                editPost("title");
                                            }
                                        }}
                                    >
                                        {post.title}
                                    </h5>
                                    <p
                                        className="card-text"
                                        onClick={() => {
                                            if (
                                                authState.username ===
                                                post.username
                                            ) {
                                                editPost("content");
                                            }
                                        }}
                                    >
                                        {post.content}
                                    </p>
                                    <p className="card-text">{post.username}</p>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text">
                                        {post.createdAt}
                                    </p>
                                </div>
                            </div>
                            {authState.username === post.username && (
                                <button
                                    className="btn btn-danger my-3"
                                    onClick={() => deletePost(post.id)}
                                >
                                    Delete Post
                                </button>
                            )}
                            <Comments />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPost;
