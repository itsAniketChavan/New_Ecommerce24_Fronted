import React, { useState, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import signupImg from "../assets/images/signupImg.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import PulseLoader from 'react-spinners/PulseLoader';
import userImage from "../assets/images/user.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultAvatarBase64 = 'data:image/png;base64,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'; // Replace with actual base64 string

const SignUpPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     

    const avatarToUpload = avatar || defaultAvatarBase64;
    console.log(avatar)

    try {
      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, avatar: avatarToUpload }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
    <ToastContainer />
    <section className="bg-white min-h-screen flex items-center justify-center relative">
       
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center text-blue-600 hover:underline text-lg font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Home
      </Link>

      <div className="flex flex-wrap items-center justify-center w-full max-w-6xl mx-auto p-6">
        <div className="hidden md:block md:w-1/2 p-6 h-full">
          <img className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out" src={signupImg} alt="Sample" />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
          <div className="w-full space-y-8">
            <h1 className="hover:text-sky-500 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
              Create an account
            </h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900">Your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Your email</label>
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
                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900">Password</label>
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
              <div>
                <label htmlFor="avatar" className="block mb-2 text-lg font-medium text-gray-900">Upload Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-3 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  onChange={handleAvatarChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <PulseLoader color="#ffffff" size={10} />
                ) : (
                  'Sign up'
                )}
              </button>
              <p className="text-lg font-light text-gray-500">
                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section></>
  );
};

export default SignUpPage;
