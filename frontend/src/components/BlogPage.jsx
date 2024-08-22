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
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-500 mb-4">By {blog.author.name}</p>
            <p className="mb-4">{blog.body}</p>
            <div className="flex items-center gap-2">
                <p className="text-gray-500">{blog.likes.length} likes</p>
                <p className="text-gray-500">{blog.comments.length} comments</p>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                {blog.comments.map(comment => (
                    <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-2">
                        <p>{comment.content}</p>
                        <p className="text-gray-500">By {comment.name}</p>
                    </div>
                ))}

                <form className="mt-4">
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Write a comment..."></textarea>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2">Submit</button>
                </form>

                </div>

        </div>
    );
};

export default BlogPage;
