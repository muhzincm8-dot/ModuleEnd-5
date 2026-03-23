import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-dark-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-primary-500 hover:text-white transition-colors">
                    Task Manager
                </Link>

                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-gray-300 mr-4">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-300 hover:text-white px-4 py-2 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
