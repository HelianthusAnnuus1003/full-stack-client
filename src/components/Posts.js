// import { React } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Posts = ({posts, setPosts}) => {
//     const likeAPost = (postId) => {
//         axios
//             .post(
//                 `http://localhost:3001/likes`,
//                 {
//                     PostId: postId,
//                 },
//                 {
//                     headers: {
//                         accessToken: localStorage.getItem("accessToken"),
//                     },
//                 }
//             )
//             .then((res) => {
//                 alert(res.data);
//                 setPosts.map((item) => {
//                     if (item.id === postId) {
//                         return { ...item, Likes: [...item.Likes, 0] };
//                     } else {
//                         return item;
//                     }
//                 });
//             });
//     };

//     return (
//         <div className="container text-center">
//             <h3 className="mb-3 text-bold">List Of Posts</h3>
//             {posts &&
//                 posts.map((post, index) => {
//                     return (
//                         <div
//                             className="card text-center mt-5 text-white text-bg-warning m-auto"
//                             key={index}
//                             style={{ maxWidth: "20rem" }}
//                         >
//                             <div className="card-header text-white bg-danger">
//                                 <Link to={`/post/${post.id}`}>
//                                     Post {index + 1}
//                                 </Link>
//                             </div>
//                             <div className="card-body">
//                                 <h5 className="card-title">{post.title}</h5>
//                                 <p className="card-text">{post.content}</p>
//                                 <p className="card-text">{post.username}</p>
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => likeAPost(post.id)}
//                                 >
//                                     Like
//                                     <span className="mx-2">
//                                         {post.Likes.length}
//                                     </span>
//                                 </button>
//                             </div>
//                             <div className="card-footer bg-success">
//                                 {post.createdAt}
//                             </div>
//                         </div>
//                     );
//                 })}
//         </div>
//     );
// };

// export default Posts;
