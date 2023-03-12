import { React, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
    const { authState } = useContext(AuthContext);
    const navigation = useNavigate();

    useEffect(() => {
        if (!authState.status) {
            navigation("/login");
        }
    }, []);

    const initialValue = {
        title: "",
        content: "",
    };

    const onSubmit = (data) => {
        axios
            .post("http://localhost:3001/posts", data, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                navigation("/");
            });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title!"),
        content: Yup.string().required("You must input a content!"),
    });

    return (
        <div
            className="container"
            style={{ marginTop: "8rem", marginBottom: "8rem" }}
        >
            <div className="row">
                <div className="col-6">
                    <Formik
                        initialValues={initialValue}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className="rounded border bg-warning py-3 px-5">
                            <h3>Create a Post</h3>
                            <div className="my-5">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="title"
                                    component="p"
                                />
                                <Field
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Title..."
                                />
                            </div>
                            <div className="my-5">
                                <label htmlFor="content" className="form-label">
                                    Content
                                </label>
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="content"
                                    component="p"
                                />
                                <Field
                                    className="form-control"
                                    id="content"
                                    name="content"
                                    as="textarea"
                                    placeholder="Content..."
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="col-6">
                    <img
                        src="https://as2.ftcdn.net/v2/jpg/04/55/64/65/1000_F_455646537_X68fn8GMbjcItSiwG8NithU0i7D2s6pZ.jpg"
                        className="img-fluid rounded"
                        alt="..."
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
