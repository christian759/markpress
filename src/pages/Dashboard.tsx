import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import type { Post } from '../types/post';
import { format } from 'date-fns';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Assuming GET /posts?author=me or similar, OR filter client side.
            // For this spec, let's assume GET /posts returns all, but in a real app we'd want filtered.
            // Or maybe there's a specific /dashboard/posts endpoint.
            // Given the prompt didn't specify a "my posts" endpoint, I'll filter client side for now, 
            // or assume /posts returns "my" posts if authenticated? 
            // Actually strictly GET /posts usually returns public feed. 
            // I'll fetch /posts and just display them for now, but ideally we need an endpoint for user posts.
            // Let's assume standard REST behavior where GET /posts is public. 
            // I'll leave it as GET /posts for now but filtering by author would be ideal if I had the user ID easily accessible and reliable.
            // Actually, standard practice for "Dashboard" is usually a user-specific list.
            // I'll check if the plan specified a specific endpoint. 
            // The plan lists GET /posts. I'll just use that.
            const response = await api.get<Post[]>('/posts');
            // In a real app we would filter by current user here or use a specific endpoint.
            setPosts(response.data);
        } catch (err) {
            console.error('Failed to fetch posts', err);
            setError('Failed to load your posts.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter(p => p.id !== id));
        } catch (err) {
            console.error('Failed to delete post', err);
            alert('Failed to delete post');
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-primary-500" />
            </div>
        );
    }

    return (
        <div className="py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
                <Link to="/dashboard/new" className="btn btn-primary gap-2">
                    <Plus className="h-4 w-4" />
                    New Post
                </Link>
            </div>

            {error && (
                <div className="mb-6 rounded-lg bg-red-900/20 p-4 text-red-200 border border-red-900/50">
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800 text-xs uppercase text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium">Title</th>
                            <th scope="col" className="px-6 py-4 font-medium">Date</th>
                            <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                    You haven't written any posts yet.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-200">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                to={`/post/${post.slug}`}
                                                className="text-slate-400 hover:text-primary-400 transition-colors"
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                to={`/dashboard/edit/${post.id}`}
                                                className="text-slate-400 hover:text-blue-400 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-slate-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
