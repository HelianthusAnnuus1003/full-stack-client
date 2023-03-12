import { useEffect, useState, useContext, React } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Comments = () => {
    const [newComment, setNewComent] = useState("");
    const [comments, setComents] = useState([]);
    const { authState, setAuthState } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
            setComents(res.data);
        });
    }, [id]);

    const onSendComment = () => {
        axios
            .post(
                "http://localhost:3001/comments",
                {
                    commentBody: newComment,
                    PostId: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error);
                } else {
                    const commentToAdd = {
                        commentBody: newComment,
                        username: res.data.username,
                        createdAt: res.data.createdAt,
                    };
                    setComents([...comments, commentToAdd]);
                    console.log("Add comment success");
                    setNewComent("");
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.error);
                } else {
                    setComents(comments.filter((item) => item.id !== id));
                }
            });
    };

    return (
        <div className="comments mt-5">
            <form className="mb-5">
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        style={{ height: "100px" }}
                        value={newComment}
                        onChange={(e) => setNewComent(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                </div>
                <button
                    type="button"
                    className="btn btn-success mt-3"
                    style={{ width: "10rem" }}
                    onClick={onSendComment}
                >
                    Send
                </button>
            </form>
            <ul className="list-unstyled">
                {comments &&
                    comments.map((comment, index) => {
                        return (
                            <li key={index}>
                                <div className="card mb-3">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img
                                                src="https://as1.ftcdn.net/v2/jpg/03/61/89/90/1000_F_361899026_5WIbkB21L5V6ETYtJ2fkfFTRx3XT6VY2.jpg"
                                                className="img-fluid rounded-start"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {comment.username}
                                                </p>
                                                <div className="row">
                                                    <p className="card-text">
                                                        {comment.commentBody}
                                                    </p>
                                                    {authState.username ===
                                                        comment.username && (
                                                        <button
                                                            className="btn btn-danger m-auto mb-3"
                                                            style={{
                                                                maxWidth:
                                                                    "5rem",
                                                            }}
                                                            onClick={() =>
                                                                deleteComment(
                                                                    comment.id
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        {comment.createdAt}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Comments;
