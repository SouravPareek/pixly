import React, { useState, useRef } from "react";
import "../styles/CreatePost.scss";
import "../../auth/styles/form.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
import Nav from "../../shared/components/Nav";

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const postImageInputFieldRef = useRef(null);

    const navigate = useNavigate();

    const { loading, handleCreatePost } = usePost();

    async function handleSubmit(e) {
        e.preventDefault();

        const file = postImageInputFieldRef.current.files[0];

        // if (!file) {
        //     alert("Please select an image");
        //     return;
        // }

        await handleCreatePost(file, caption);
        navigate("/feed");
    }

    if (loading) {
        return (
            <main>
                <h1>Creating Post</h1>
            </main>
        );
    }

    return (
        <main className="create-post-page">
            <Nav />
            <div className="form-container">
                <p className="form-kicker">NEW ENTRY</p>
                <h1>Add a moment.</h1>
                <form onSubmit={handleSubmit}>
                    <label className="post-image-label" htmlFor="postImage">
                        Choose an image
                    </label>
                    <input
                        ref={postImageInputFieldRef}
                        hidden
                        type="file"
                        name="postImage"
                        id="postImage"
                    />
                    <input
                        value={caption}
                        onChange={(e) => {
                            setCaption(e.target.value);
                        }}
                        type="text"
                        name="caption"
                        id="caption"
                        placeholder="Add a short note (optional)"
                    />
                    <button className="button primary-button">
                        Publish moment
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreatePost;
