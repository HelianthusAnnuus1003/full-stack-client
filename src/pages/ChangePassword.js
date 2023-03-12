import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const ChangePassword = () => {
    const navigation = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { authState } = useContext(AuthContext);

    const changePassword = () => {
        axios
            .put(
                `http://localhost:3001/auth/changepassword`,
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    alert("Change password success!");
                    navigation(`/profile/${authState.id}`);
                }
            });
    };

    return (
        <div>
            <h1>ChangePassword</h1>
            <label>Old Password:</label>
            <input
                type="text"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />

            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />

            <button onClick={changePassword}>Save Change</button>
        </div>
    );
};

export default ChangePassword;
