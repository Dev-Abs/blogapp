import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, likeBlog } from "../features/blogs/blogsSlice";
import { FaThumbsUp, FaArrowUp } from "react-icons/fa";
import { likeBlogLocally } from "../features/blogs/blogsSlice";
import { selectAllLocalBlogs } from "../features/blogs/blogsSlice";
import { getUser } from "../features/users/getUserSlice";
import imagePlaceholder from "../assets/image_placeholder2.jpeg";


const BlogsList = ({ toggleDanger }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { loading, error } = useSelector((state) => state.blogs);
  const localBlogs = useSelector(selectAllLocalBlogs);
  const sortedBlogs = localBlogs
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [blogLikes, setBlogLikes] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (localBlogs.length === 0) return;
    setBlogLikes(
      localBlogs.map((blog) => ({
        blogId: blog._id,
        likes: blog.likes,
      }))
    );
  }, [localBlogs]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLiked = (blogId) => {
    const blogLike = blogLikes.find((blog) => blog.blogId === blogId);
    if (blogLike) {
      return blogLike.likes.some((like) => like.userId === user._id);
    }
    return false;
  };

  const handleLike = (blogId) => {
    const updatedBlogLikes = blogLikes.map((blog) => {
      if (blog.blogId === blogId) {
        const alreadyLiked = blog.likes.some(
          (like) => like.userId === user._id
        );
        if (alreadyLiked) {
          return {
            ...blog,
            likes: blog.likes.filter((like) => like.userId !== user._id),
          };
        } else if (user._id && !alreadyLiked) {
          return {
            ...blog,
            likes: [...blog.likes, { userId: user._id }],
          };
        }
      }
      return blog;
    });
    setBlogLikes(updatedBlogLikes);
    dispatch(likeBlog(blogId));
    dispatch(likeBlogLocally(blogId));
  };

  const getLikes = (blogId) => {
    const blog = blogLikes.find((blog) => blog.blogId === blogId);
    return blog ? blog.likes.length : 0;
  };

  const BlogClickHandle = (blog) => {
    navigate(`/blog/${blog._id}`);
  };

  const AuthorClickHandle = (authorId, authorName) => {
    navigate(`/author/${authorId}`, { state: { authorId, authorName } });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-16 pb-24 bg-slate-200">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 my-4">
            Our Latest Blogs
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news and insights from our blog.
          </p>
        </header>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && (
          <div className="text-center text-red-600">
            Error: {error.message || error}
          </div>
        )}
        <div className="flex flex-wrap -mx-4">
          {sortedBlogs.map((blog) => (
            <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-20">
              <article className="h-[500px] custom-scrollbar bg-white hover:animate-background hover:bg-[length:400%_400%] hover:[animation-duration:_4s]  p-[3px]  transitionbg-white shadow-lg rounded-lg  transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50">
                <img
                  src={blog.featuredImage || imagePlaceholder}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg bg-gray-300"
                />
                <div className="relative p-6 rounded-[10px] bg-white !pt-20 sm:p-6 flex flex-col">
                  <span className="absolute top-4 left-4 bg-slate-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {blog.categories || "Unknown Category"}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="self-start p-2 bg-slate-100 text-slate-500 text-sm font-medium rounded-lg">
                      By <span onClick={() => {
                        AuthorClickHandle(blog.author !== null ? blog.author._id : "Unknown", blog.author !== null ? blog.author.name : "Unknown")
                      }}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
                      > {blog.author !== null ? blog.author.name : "Unknown"} </span>
                    </span>
                    <div className="flex items-center gap-x-4">
                      <button
                        onClick={() => {
                          user._id ? handleLike(blog._id) : toggleDanger();
                        }}
                        className={`flex items-center ${
                          handleLiked(blog._id)
                            ? "text-blue-500"
                            : "text-gray-500"
                        } hover:text-indigo-700 transition-colors duration-300`}
                      >
                        <FaThumbsUp className="mr-1" /> {getLikes(blog._id)}
                      </button>
                    </div>
                  </div>
                  <time
                    dateTime={new Date(blog.createdAt).toISOString()}
                    className="absolute top-4 right-4 bg-slate-500 text-white text-xs px-2 py-1 rounded"
                  >
                    {new Date(blog.createdAt).toLocaleDateString() +
                      " " +
                      new Date(blog.createdAt).toTimeString().slice(0, 5)}
                  </time>
                  <h2
                    onClick={() => BlogClickHandle(blog)}
                    className="mt-8 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300 hover:cursor-pointer"
                  >
                    {blog.title}
                  </h2>
                  <p
                    onClick={() => BlogClickHandle(blog)}
                    className="mt-4 text-gray-600 hover:cursor-pointer"
                  >
                    {blog.body.length > 50
                      ? blog.body.slice(0, 50) + "..."
                      : blog.body}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaArrowUp size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default BlogsList;
