import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenSquare, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                        <span className="font-bold text-white text-lg">M</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-100">MarkPress</span>
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard/new"
                                className="btn btn-primary gap-2 text-sm"
                            >
                                <PenSquare className="h-4 w-4" />
                                <span>Write</span>
                            </Link>

                            <Link to="/dashboard" className="btn btn-ghost">
                                Dashboard
                            </Link>

                            <div className="flex items-center gap-2 pl-4 border-l border-slate-700 ml-2">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <UserIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline-block">{user?.username || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-ghost p-2 text-slate-400 hover:text-red-400"
                                    title="Logout"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost text-sm">
                                Sign in
                            </Link>
                            <Link to="/register" className="btn btn-primary text-sm">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
