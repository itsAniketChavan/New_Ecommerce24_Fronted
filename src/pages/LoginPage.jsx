import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon
import loginImg from "../assets/images/loginImg.png";
import { AuthContext } from '../contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader'; // Import PulseLoader

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  
  
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
       
      const data = await response.json();
      
      
      if (response.ok) {
        login(data);  
        toast.success('Login successful');
 
        setTimeout(() => {
          const role =  (localStorage.getItem('role'));
          if (role === 'user') {
            navigate('/profile');
          } else if (role === 'vendor') {
            navigate('/vendor');  
          } else {
            navigate('/pages');
          }
        }, 1500);  
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after login attempt is done
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center relative">
      <ToastContainer/>
      <Link 
        to="/" 
        className="absolute top-4 left-4 flex items-center text-blue-600 hover:underline text-lg font-medium"
      >
        <FaArrowLeft className="mr-2" /> {/* Left arrow icon */}
        Home
      </Link>
      
      <div className="flex flex-wrap items-center justify-center w-full max-w-6xl mx-auto p-6">
        {/* Image Div */}
        <div className="hidden md:block w-full md:w-1/2 p-6">
          <img
            className="w-full h-full rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            src={loginImg}
            alt="Login"
          />
        </div>

        {/* Main Div */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-12 space-y-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
            Sign in to your account
          </h1>
          <form className="space-y-8" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  />
                </div>
                <div className="ml-3 text-lg">
                  <label htmlFor="remember" className="text-gray-500">
                    Remember me
                  </label>
                </div>
              </div>
              <Link to="#" className="text-lg font-medium text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <PulseLoader color="#ffffff" size={10} />
              ) : (
                'Sign in'
              )}
            </button>
            <p className="text-lg font-light text-gray-500">
              Don’t have an account yet?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
