import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-dark-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

            {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark-900 border border-gray-600 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 bg-dark-900 border border-gray-600 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 bg-dark-900 border border-gray-600 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white transition-colors"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors mt-2 cursor-pointer"
                >
                    Sign Up
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
                Already have an account? <Link to="/login" className="text-primary-500 hover:text-blue-400">Login</Link>
            </p>
        </div>
    );
};

export default Register;
