import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorSpecificBlogsById } from "../features/blogs/authorSpecificBlogsSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AuthorSpecificBlogs = () => {
  const { authorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authorSpecificBlogs, loading, error } = useSelector(
    (state) => state.authorSpecificBlogs
  );

  // get author name from the  navigate(`/author/${authorId}`, { state: { authorId, authorName } }); in AuthorPage.jsx
  const {authorName} = location.state;

  
  useEffect(() => {
    dispatch(fetchAuthorSpecificBlogsById(authorId));
  }, [dispatch, authorId]);

  const sortedBlogs = authorSpecificBlogs
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const BlogClickHandle = (blog) => {
      navigate(`/blog/${blog._id}`);
    };

  return (
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-slate-200">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
              <span className="font-bold text-3xl text-primary block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                {authorName}'s Blogs
              </span>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && (
          <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
            <span className="font-bold text-3xl z-10 text-primary block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              Error Fetching Blogs: {error}
            </span>
          </div>
        )}
        {sortedBlogs.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {sortedBlogs.map((blog) => (
              <div
                key={blog._id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-16"
              >
                <article className="h-[470px] bg-white custom-scrollbar hover:animate-background hover:bg-[length:400%_400%] hover:[animation-duration:_4s] transitionbg-white shadow-lg rounded-lg  transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50">
                  <img
                    src={blog.featuredImage || "default_image_url.jpg"}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg bg-gray-300"
                  />
                  <div className="relative p-3 ounded-[10px] bg-white !pt-20 sm:p-6 flex flex-col">
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
                    <h2
                      onClick={() => BlogClickHandle(blog)}
                      className="mt-2 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300 hover:cursor-pointer"
                    >
                      {blog.title}
                    </h2>
                    <p className="mt-2 text-gray-600">
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
      </div>
    </section>
  );
};

export default AuthorSpecificBlogs;
