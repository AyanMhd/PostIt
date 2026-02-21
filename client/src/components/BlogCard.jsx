import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="card">
      <h3 className="card-title">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p className="card-text">
        {blog.content && blog.content.length > 150
          ? blog.content.slice(0, 150) + "..."
          : blog.content}
      </p>
      <div className="card-footer">
        <span className="card-meta">
          {blog.author?.name || "Anonymous"}
        </span>
        <Link to={`/blogs/${blog._id}`} className="read-more">
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
