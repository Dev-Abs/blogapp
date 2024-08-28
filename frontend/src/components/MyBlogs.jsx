import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/users/getUserSlice";
import {
  fetchAuthorSpecificBlogs,
  updateBlog,
  setBlogId,
  deleteBlog,
} from "../features/blogs/authorSpecificBlogsSlice";

import { useState } from "react";
import { useNavigate } from "react-router";
import imagePlaceholder from "../assets/image_placeholder2.jpeg";
import ConfirmModal from "./ConfirmModal";

const DrawerForm = ({ blogID, show, onClose, toggleSuccess }) => {
  const dispatch = useDispatch();
  const [blogUpdate, setBlogUpdate] = useState({
    title: "",
    categories: "",
    featuredImage: "",
    body: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlogUpdate({
      ...blogUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ ...blogUpdate, _id: blogID }));
    setBlogUpdate({
      title: "",
      categories: "",
      featuredImage: "",
      body: "",
    });
    navigate("/myblogs");
    onClose();
    toggleSuccess("Blog Updated Successfully");
  };

  return (
    <div
      id="drawer-form"
      className={`fixed top-20 lg:top-32 left-0 z-40 h-screen lg:h-[600px] p-6 overflow-y-auto transition-transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } bg-white w-screen md:w-[40%] md:h-[70%] shadow-lg border border-gray-300`}
      tabIndex="-1"
      aria-labelledby="drawer-form-label"
    >
      <h5
        id="drawer-form-label"
        className="mb-6 text-lg font-semibold text-gray-800"
      >
        Update Blog
      </h5>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={blogUpdate.title}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Blog Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="categories"
            onChange={handleChange}
            value={blogUpdate.categories}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Blog Category"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="featuredImage"
            onChange={handleChange}
            value={blogUpdate.featuredImage}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Image URL"
            required
          />
        </div>
        <div>
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            rows="4"
            name="body"
            onChange={handleChange}
            value={blogUpdate.body}
            className="block w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 p-2.5"
            placeholder="Write the blog content..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Update
        </button>
      </form>
    </div>
  );
};


const MyBlogs = ({ toggleSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorSpecificBlogs, loading } = useSelector((state) => state.authorSpecificBlogs);
  const user = useSelector((state) => state.user.value);
  const [blogID, setBlogID] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Manage modal visibility
  const [deleteBlogId, setDeleteBlogId] = useState(null);

  const sortedBlogs = authorSpecificBlogs
  .slice()
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    dispatch(fetchAuthorSpecificBlogs());
    dispatch(getUser());
  }, [dispatch]);

  const handleOpenDrawer = (ID) => () => {
    setBlogID(ID);
    dispatch(setBlogId(ID));
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenConfirmModal = (blogId) => {
    setDeleteBlogId(blogId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setDeleteBlogId(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBlog(deleteBlogId));
    toggleSuccess("Blog Deleted Successfully!");
    handleCloseConfirmModal();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const getLikes = (blogId) => {
    const blog = authorSpecificBlogs.find((blog) => blog._id === blogId);
    return blog ? blog.likes.length : 0;
  };

  const getComments = (blogId) => {
    const blog = authorSpecificBlogs.find((blog) => blog._id === blogId);
    return blog ? blog.comments.length : 0;
  };

  const BlogClickHandle = (blog) => {
    navigate(`/blog/${blog._id}`);
  }

  return (
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-slate-200">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
              <span className="font-bold text-3xl text-gray-800 block">
                {user.name ? `${user.name}'s Blogs` : "My Blogs"}
              </span>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {sortedBlogs.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {sortedBlogs.map((blog) => (
              <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-16">
                <article className="h-[470px] bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                  <img
                    src={blog.featuredImage || imagePlaceholder}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg bg-gray-300"
                  />
                  <div className="relative p-3 bg-white pt-20 flex flex-col">
                    <span className="absolute top-4 left-4 bg-slate-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {blog.categories || "Unknown Category"}
                    </span>
                    <time
                      dateTime={new Date(blog.createdAt).toISOString()}
                      className="absolute top-4 right-4 bg-slate-500 text-white text-xs px-2 py-1 rounded"
                    >
                      {new Date(blog.createdAt).toLocaleDateString() +
                        " " +
                        new Date(blog.createdAt).toTimeString().slice(0, 5)}
                    </time>
                    <div className="flex items-center gap-x-4 justify-between ">
                      <div>
                        <button
                          type="button"
                          onClick={handleOpenDrawer(blog._id)}
                          className="focus:outline-none mr-2 text-white bg-green-600 rounded-lg text-xs px-2 lg:px-5 py-2 hover:bg-green-500"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenConfirmModal(blog._id)}
                          className="focus:outline-none text-white bg-red-600 rounded-lg text-xs px-2 lg:px-5 py-2 hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="self-end flex mb-4">
                        <p className="text-gray-500">
                          {getLikes(blog._id)} likes
                        </p>
                        <p className="text-gray-500 ml-4">
                          {getComments(blog._id)} comments
                        </p>
                      </div>
                    </div>
                    <h2
                      onClick={() => BlogClickHandle(blog)}
                      className="mt-2 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300 hover:cursor-pointer"
                    >
                      {blog.title}
                    </h2>
                    <p
                      onClick={() => BlogClickHandle(blog)}
                      className="mt-2 text-gray-600"
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
        ) : (
          <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
            <span className="font-bold text-3xl text-primary block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              No Blogs Found
            </span>
          </div>
        )}
        <DrawerForm
          blogID={blogID}
          show={drawerOpen}
          onClose={handleCloseDrawer}
          toggleSuccess={toggleSuccess}
        />
        <ConfirmModal
          show={showConfirmModal}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </section>
  );
};

export default MyBlogs;
