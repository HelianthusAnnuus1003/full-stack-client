import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigation = useNavigate();

    const initialValue = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("You must input a username!")
            .min(3)
            .max(15),
        password: Yup.string()
            .min(4)
            .max(20)
            .required("You must input a password!"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/", data).then((res) => {
            console.log("Register success");
        });
        navigation("/login");
    };

    return (
        <div
            className="container"
            style={{ marginTop: "8rem", marginBottom: "8rem" }}
        >
            <div className="row">
                <div className="col-6">
                    <img
                        src="https://as1.ftcdn.net/v2/jpg/05/36/05/86/1000_F_536058605_rZjob93En0KFLkwdM6nWUkTrIE9Ymdx4.jpg"
                        className="img-fluid rounded"
                        alt="..."
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-6">
                    <Formik
                        initialValues={initialValue}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className="rounded border bg-info py-3 px-5">
                            <h3>Registation</h3>
                            <div className="my-5">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="username"
                                    component="p"
                                />
                                <Field
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Username..."
                                />
                            </div>
                            <div className="my-5">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="password"
                                    component="p"
                                />
                                <Field
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password..."
                                />
                            </div>
                            <button type="submit" className="btn btn-success">
                                Register
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Registration;
