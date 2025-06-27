/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { login } from '../../service/authService';
import { assets } from './../../assets/assets';
import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);

    // State to hold email and password inputs
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setAuthData } = useContext(AppContext);

    // Handles input field changes and updates the state accordingly
    const onChangeHandler = (e) => {
        const name = e.target.name;  // Field name: 'email' or 'password'
        const value = e.target.value; // Field value
        // Spread existing data and update the specific field
        setData(data => ({ ...data, [name]: value }));
    };

    //  Handles login logic when form is submitted
    const onLogin = async (e) => {
        e.preventDefault(); // Prevents page refresh
        setLoading(true);
        try {
            // Sends login request to backend
            const response = await login(data);

            if (response.status === 200) {
                toast.success('Welcome Back!');

                // Store token and role in localStorage for persistent login
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                // Update auth context with new data
                setAuthData(response.data.token, response.data.role);

                // Navigate to home page after successful login
                navigate('/');
            } else {
                toast.error('Failed to Login');
            }
        } catch (e) {
            console.error(e.message);
            toast.error('Email/Password Invalid');
        } finally {
            setLoading(false); // Stop loading state in both success/failure
        }
    };

    return (
        <div
            className="bg-light d-flex align-items-center justify-content-center vh-100 login-background"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${assets.billing})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign In</h1>
                        <p className="card-text text-muted">Sign in below to access your account</p>
                    </div>
                    <div className="mt-4 form">
                        <form onSubmit={onLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="youremail@example.com"
                                    onChange={onChangeHandler}
                                    value={data.email}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="********"
                                    onChange={onChangeHandler}
                                    value={data.password}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-4 d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-lg form-control"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
