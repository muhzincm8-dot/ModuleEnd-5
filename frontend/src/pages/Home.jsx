import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Trash2, Edit2 } from 'lucide-react';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }

        if (user) {
            fetchTasks();
        }
    }, [user, loading, navigate]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks', err);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const res = await api.post('/tasks', { title: newTask });
            setTasks([res.data, ...tasks]);
            setNewTask('');
            setIsAdding(false);
        } catch (err) {
            console.error('Error adding task', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error('Error deleting task', err);
        }
    };

    const toggleComplete = async (task) => {
        try {
            const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
            setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
        } catch (err) {
            console.error('Error updating task', err);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Tasks</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                >
                    {isAdding ? 'Cancel' : 'Add Task'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddTask} className="mb-8 bg-dark-800 p-4 rounded-lg flex gap-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="flex-1 px-4 py-2 bg-dark-900 border border-gray-600 rounded-md focus:outline-none focus:border-primary-500 text-white"
                        placeholder="What needs to be done?"
                        autoFocus
                    />
                    <button type="submit" className="bg-primary-500 hover:bg-blue-600 px-6 py-2 rounded-md transition-colors cursor-pointer">
                        Save
                    </button>
                </form>
            )}

            {tasks.length === 0 ? (
                <div className="bg-dark-800 rounded-lg p-6 shadow-lg border border-gray-700 text-center text-gray-400">
                    No tasks found. Create one!
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-dark-800 p-4 rounded-lg flex items-center justify-between border border-gray-700 hover:border-gray-500 transition-colors">
                            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleComplete(task)}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    readOnly
                                    className="w-5 h-5 accent-primary-500 cursor-pointer"
                                />
                                <span className={`text-lg transition-colors ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                                    {task.title}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleDelete(task._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
