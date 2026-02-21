import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error loading blog details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="empty-state">
        <h3>Blog not found</h3>
        <p>The blog you're looking for doesn't exist or was removed.</p>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: "1rem", display: "inline-flex" }}>
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="article">
      <Link to="/" className="back-link">← Back to all blogs</Link>
      <div className="article-header">
        <h1 className="article-title">{blog.title}</h1>
        {blog.author && (
          <span className="card-meta">By {blog.author.name}</span>
        )}
      </div>
      <div className="article-body">
        <p>{blog.content}</p>
      </div>
    </article>
  );
}

export default BlogDetails;