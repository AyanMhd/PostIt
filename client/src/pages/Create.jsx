import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/blogs", { title, content });
      navigate("/");
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(err.response?.data?.message || "Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create a new post</h1>
          <p>Share your thoughts with the world</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="input"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="input"
              placeholder="Write your blog content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              style={{ resize: "vertical" }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary form-submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;