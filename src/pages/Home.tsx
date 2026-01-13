import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import type { Post } from '../types/post';
import PostCard from '../components/PostCard';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get<Post[]>('/posts');
                setPosts(response.data);
            } catch (err) {
                console.error('Failed to fetch posts', err);
                // Fallback for demo if API isn't running or empty
                // setError('Failed to load posts.');
                // For development/demo purposes without a live backend, we might want to show empty state or mock data
                // But per instructions, we expect a backend. I'll show error if it fails.
                setError('Could not connect to the server. Please ensure the backend is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-primary-500" />
            </div>
        );
    }

    return (
        <div className="py-12">
            <header className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                    The MarkPress Blog
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-slate-400">
                    Thoughts, ideas, and stories from the community.
                </p>
            </header>

            {error ? (
                <div className="rounded-xl border border-red-900/50 bg-red-900/20 p-6 text-center text-red-200">
                    {error}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center text-slate-500">
                    No posts found. Check back later!
                </div>
            ) : (
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
