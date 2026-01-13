import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import type { Post } from '../types/post';
import { User, Calendar } from 'lucide-react';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Link
            to={`/post/${post.slug}`}
            className="group block card hover:bg-slate-800 transition-all duration-200 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
        >
            <article className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-100 group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                </h2>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author.username}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.created_at}>
                            {format(new Date(post.created_at), 'MMM d, yyyy')}
                        </time>
                    </div>
                </div>

                <p className="text-slate-400 line-clamp-3 leading-relaxed">
                    {/* Simple stripped content preview if no excerpt provided */}
                    {post.content.replace(/[#*`]/g, '').slice(0, 160)}...
                </p>

                <span className="mt-2 text-sm font-medium text-primary-500 group-hover:text-primary-400">
                    Read article →
                </span>
            </article>
        </Link>
    );
};

export default PostCard;
