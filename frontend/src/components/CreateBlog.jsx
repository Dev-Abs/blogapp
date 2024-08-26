import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../features/blogs/createBlogSlice";
import { useNavigate } from "react-router";

const CreateBlog = ({ toggleSuccess }) => {
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
    setBlog({
      title: "",
      categories: "",
      featuredImage: "",
      body: "",
    });
    navigate('/');
    toggleSuccess("Blog Created Successfully");
  };

  return (
    token ? (
      <section className="pt-20 bg-slate-200 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold leading-tight text-slate-900">
              Create a Blog
            </h2>
            <p className="text-lg text-slate-600">
              Share your thoughts with the world
            </p>
          </div>
          <div className="max-w-3xl mx-auto p-8 bg-slate-300 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    value={blog.title}
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 p-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your blog title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="categories"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Categories
                  </label>
                  <input
                    onChange={handleChange}
                    value={blog.categories}
                    type="text"
                    id="categories"
                    name="categories"
                    className="mt-1 p-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter categories separated by commas"
                  />
                </div>

                <div>
                  <label
                    htmlFor="featuredImage"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Featured Image
                  </label>
                  <input
                    onChange={handleChange}
                    value={blog.featuredImage}
                    type="text"
                    id="featuredImage"
                    name="featuredImage"
                    className="mt-1 p-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label
                    htmlFor="body"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Body
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={blog.body}
                    id="body"
                    name="body"
                    rows={6}
                    className="mt-1 p-1 block w-full rounded-md bg-slate-200 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-transform transform hover:scale-105"
                >
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    ) : (
      <div className="flex justify-center items-center h-screen bg-slate-200">
        <h1 className="text-3xl font-bold text-slate-800">You need to login to create a blog</h1>
      </div>
    )
  );
};

export default CreateBlog;
