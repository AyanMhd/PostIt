import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import api from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero">
        <h1>Discover & Share Ideas</h1>
        <p>Read stories, ideas, and perspectives from writers on any topic that matters to you.</p>
      </div>

      {blogs.length === 0 ? (
        <div className="empty-state">
          <h3>No blogs yet</h3>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
