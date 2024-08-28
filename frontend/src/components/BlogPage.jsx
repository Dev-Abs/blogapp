import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import imagePlaceholder from "../assets/image_placeholder2.jpeg";
import { HiOutlineChevronRight } from "react-icons/hi";
import {
  fetchBlogs,
  addComment,
  selectAllBlogs,
} from "../features/blogs/blogsSlice";
import { getUser } from "../features/users/getUserSlice";

const BlogPage = ({ toggleDanger }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs, loading, error } = useSelector(selectAllBlogs);
  const user = useSelector((state) => state.user.value);

  const [blogLikes, setBlogLikes] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  let token = localStorage.getItem("token")
  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(getUser());
    token = localStorage.getItem("token");
  }, [dispatch]);


  useEffect(() => {
    const currentBlog = blogs.find((blog) => blog._id === id);
    if (!currentBlog) return;

    setBlogLikes([
      {
        blogId: currentBlog._id,
        likes: currentBlog.likes,
      },
    ]);

    setComments({
      [currentBlog._id]: currentBlog.comments || [],
    });
  }, [blogs, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  if (error)
    toggleDanger("An error occurred. Please try again later.");

  const blog = blogs.find((blog) => blog._id === id);

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Blog not found.</p>
      </div>
    );

  const handleAddComment = (blogId, content) => {
    dispatch(addComment({ blogId, content }));
    setComments((prevComments) => ({
      ...prevComments,
      [blogId]: [...prevComments[blogId], { userId: user._id, content }],
    }));
    setComment("");
  };

  const getComments = (blogId) => {
    return comments[blogId] || [];
  };

  const getLikes = (blogId) => {
    const blog = blogLikes.find((blog) => blog.blogId === blogId);
    return blog ? blog.likes.length : 0;
  };

  const AuthorClickHandle = (authorId, authorName) => {
    navigate(`/author/${authorId}`, { state: { authorId, authorName } });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-[5%]">
      <header className="mb-8 text-center">
        <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4 mt-6">{blog.title}</h1>
        <p className="text-gray-500">By{" "}
         <span
         onClick={() => AuthorClickHandle(blog.author._id, blog.author.name)}
         className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
         >
         {blog.author.name}
          </span> </p>
        <p className="text-gray-600">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Blog Image */}
        <div className="flex-shrink-0">
          <img
            src={blog.featuredImage || imagePlaceholder}
            alt={blog.title}
            className="w-full h-auto lg:max-w-sm rounded-lg object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="flex-1">
          <p className="mb-4">{blog.body}</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">{getLikes(blog._id)} likes</p>
            <p className="text-gray-500">
              {getComments(blog._id).length} comments
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {getComments(blog._id).map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
                <p>{comment.content}</p>
                <p className="text-gray-500">By {comment.name || "You"}</p>
              </div>
            ))}

{          token ?  <div className="flex justify-center items-center gap-2">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Write a comment..."
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(blog._id, e.target.value);
                    e.target.value = "";
                  }
                }}
                rows={1}
              ></textarea>
              <button
                onClick={() => handleAddComment(blog._id, comment)}
                className="bg-indigo-500 text-white px-4 py-3 rounded-lg"
              >
                <HiOutlineChevronRight />
              </button>
            </div>
            : 
            // please login to interact with the blog
            <div className="flex justify-center items-center gap-2">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Please login to add a comment"
                rows={1}
                disabled
              ></textarea>
              <button
                className="bg-gray-300 text-white px-4 py-3 rounded-lg"
                disabled
              >
                <HiOutlineChevronRight />
              </button>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
