import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { createBlog } from "../features/blogs/createBlogSlice";
import { useNavigate } from "react-router";

const CreateBlog = ({toggleSuccess}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    token = localStorage.getItem("token");
  }, []);
  const [blog, setBlog] = React.useState({
    title: "",
    categories: "",
    featuredImage: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(blog));
    blog.title = "";
    blog.categories = "";
    blog.featuredImage = "";
    blog.body = "";
    navigate('/');
    toggleSuccess("Blog Created Successfully")
  };

  return (
      token ? 
        <section className="pt-20 bg-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
            Create a Blog
          </h2>
          <p className="text-xl text-gray-600">
            Share your thoughts with the world
          </p>
        </div>
        <div className="max-w-2xl mx-auto mb-[40px] p-8 mt-[-40px] rounded-lg shadow-lg bg-slate-100">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-4 mb-8">
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <input
                  onChange={handleChange}
                  value={blog.title}
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block bg-slate-300 p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your blog title"
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Categories
                </label>
                <input
                  onChange={handleChange}
                  value={blog.categories}
                  type="text"
                  id="categories"
                  name="categories"
                  className="mt-1 block bg-slate-300 p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter categories separated by commas"
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="featuredImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Featured Image
                </label>
                <input
                  onChange={handleChange}
                  value={blog.featuredImage}
                  type="text"
                  id="featuredImage"
                  name="featuredImage"
                  className="mt-1 block bg-slate-300 p-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="w-full px-4 mb-8">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Body
                </label>
                <textarea
                  onChange={handleChange}
                  value={blog.body}
                  id="body"
                  name="body"
                  rows={2}
                  className="mt-1 bg-slate-300 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-transform transform hover:scale-105"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </section> : 
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <h1 className="text-3xl font-bold text-gray-800">You need to login to create a blog</h1>
    </div>
    
  );
};

export default CreateBlog;
