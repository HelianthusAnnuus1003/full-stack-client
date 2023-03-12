import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import DetailPost from "./pages/DetailPost";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
    const [authState, setAuthState] = useState({
        id: 0,
        username: "",
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                if (res.data.error) {
                    setAuthState({
                        ...authState,
                        status: false,
                    });
                } else {
                    setAuthState({
                        id: res.data.id,
                        username: res.data.username,
                        status: true,
                    });
                }
            });
    }, []);

    return (
        <div className="App pt-5">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/createpost" element={<CreatePost />} />
                        <Route path="/post/:id" element={<DetailPost />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/registration"
                            element={<Registration />}
                        />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route
                            path="/changepassword"
                            element={<ChangePassword />}
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
