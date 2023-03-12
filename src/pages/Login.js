import { React, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
    const navigation = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        if (authState.status) {
            navigation("/");
        }
    }, []);

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState({
                    id: res.data.id,
                    username: res.data.username,
                    status: true,
                });
                navigation("/");
            }
        });
    };

    return (
        <div
            className="container"
            style={{ marginTop: "8rem", marginBottom: "8rem" }}
        >
            <div className="row">
                <div className="col-6">
                    <form className="rounded border bg-success py-3 text-white px-5">
                        <h3>Login</h3>
                        <div className="my-5">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="my-5">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={login}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="col-6">
                    <img
                        src="https://as2.ftcdn.net/v2/jpg/03/86/51/03/1000_F_386510351_03Qk3je4FGnVLo4vXRdOpoDWfZjtmajd.jpg"
                        className="img-fluid rounded"
                        alt="..."
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
