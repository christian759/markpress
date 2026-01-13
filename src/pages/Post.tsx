import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import type { Post as PostType } from '../types/post';
import { format } from 'date-fns';
import { User, Calendar, ArrowLeft } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

const Post: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const response = await api.get<PostType>(`/posts/${slug}`);
                setPost(response.data);
            } catch (err) {
                console.error('Failed to fetch post', err);
                setError('Post not found or server error.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-primary-500" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="py-12 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-200">Processing Error</h2>
                <p className="text-slate-400 mb-6">{error || 'Post not found.'}</p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="py-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
            </Link>

            <article>
                <header className="mb-10 text-center">
                    <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-100 sm:text-4xl lg:text-5xl">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium text-slate-300">{post.author.username}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.created_at}>
                                {format(new Date(post.created_at), 'MMMM d, yyyy')}
                            </time>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-lg mx-auto max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700">
                    {/* We use MDEditor.Markdown to render safely */}
                    <MDEditor.Markdown
                        source={post.content}
                        style={{ backgroundColor: 'transparent', color: 'inherit' }}
                        wrapperElement={{ "data-color-mode": "dark" }}
                    />
                </div>
            </article>
        </div>
    );
};

export default Post;
