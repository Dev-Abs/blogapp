import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllBlogs, fetchBlogs } from '../features/blogs/blogsSlice';

const BlogPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { blogs, loading, error } = useSelector(selectAllBlogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (loading) return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
    if (error) return <div className="flex justify-center items-center min-h-screen"><p>Error loading blog.</p></div>;

    const blog = blogs.find(blog => blog._id === id);

    if (!blog) return <div className="flex justify-center items-center min-h-screen"><p>Blog not found.</p></div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 mt-[5%]">
            {/* Blog Header */}
            <header className="mb-8 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                <p className="text-gray-600">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </header>

            {/* Blog Image */}
            <div className="mb-8">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>

            {/* Blog Content */}
            <article className="prose prose-xl max-w-none">
                <p>{blog.body}</p>
            </article>

        </div>
    );
};

export default BlogPage;
