const Blog = ({ blog }) => (
  <div>
    <h1>{blog.title}</h1>
    <div>
      <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
      {blog.likes} likes <button>like</button>
    </div>
    <div>added by {blog.author}</div>
  </div>
);

export default Blog;
