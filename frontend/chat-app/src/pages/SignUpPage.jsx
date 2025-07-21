import React from 'react'
import { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Pin, User } from "lucide-react";
import { Link } from "react-router-dom";
import  useAuthhook  from "../hooks/useAuthhook";
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
        });

    const [showPassword,setShowPassword] = useState(false) 

    const { signup, isSigningUp } = useAuthhook();

    const validateForm = () =>{

      if(!formData.fullName.trim()) return (toast.error('Full name is required'))
      if(!formData.email.trim()) return (toast.error('Email is required'))
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if(!formData.pin) return toast.error("Pin is Required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
      if (!/^\d{6}$/.test(formData.pin)) return toast.error("Pin must be exactly 6 digits (0-9 only)");
      
      return true;
   
    }



//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm()

        if (success === true) signup(formData);

      };


//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//     if (!/^\d{6}$/.test(value)) {
//       setError('Password must be exactly 6 digits.');
//     } else {
//       setError('');
//     }
//   };

//     const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//   const [mystyle, setMyStyle] = useState({
//     color: 'white',
//     backgroundColor: 'black'
//   });

//   const [darkMode, setDarkMode] = useState(true);

//   const toggleStyle = () => {
//     if (darkMode) {
//       setMyStyle({
//         color: 'black',
//         backgroundColor: 'white'
//       });
//     } else {
//       setMyStyle({
//         color: 'white',
//         backgroundColor: 'black'
//       });
//     }
//     setDarkMode(!darkMode);
//   };

//   return (
//     <>
//       <div style={{ ...mystyle, minHeight: '100vh', width: '100%' }}>
//         <div className="flex justify-end p-4">
//           <div
//             id="theme-switch"
//             className="flex items-center gap-2 cursor-pointer text-6xl"
//             onClick={toggleStyle}
//           >
//             <span className="material-symbols-outlined">
//               {darkMode ? 'dark_mode' : 'light_mode'}
//             </span>
//           </div>
//         </div>

//         {/* Signup container */}
//         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//             <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight" style={mystyle}>
//               Create a new account
//             </h2>
//           </div>

//           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//             <form className="space-y-6" action="#" method="POST">
//               {/* Full Name */}
//                <div>
//                 <label htmlFor="fullname" className="block text-lg font-medium" style={mystyle}>
//                   Name
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     name="fullname"
//                     id="fullname"
//                     value={formData.fullname}
//                     onChange={handleChange}
//                     required
//                     className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 ${
//                       darkMode
//                         ? 'bg-black text-white placeholder:text-gray-400'
//                         : 'bg-white text-gray-900 placeholder:text-gray-500'
//                     }`}
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-lg font-medium" style={mystyle}>
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="email"
//                     required
//                     className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 ${
//                       darkMode
//                         ? 'bg-black text-white placeholder:text-gray-400'
//                         : 'bg-white text-gray-900 placeholder:text-gray-500'
//                     }`}
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-lg font-medium" style={mystyle}>
//                 Password
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     required
//                     className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 ${
//                       darkMode
//                         ? 'bg-black text-white placeholder:text-gray-400'
//                         : 'bg-white text-gray-900 placeholder:text-gray-500'
//                     }`}
//                     placeholder="Enter a 6-digit password"
//                   />
//                   {error && (
//                     <p className="text-red-500 text-sm mt-1">{error}</p>
//                     )}
//                 </div>
//               </div>

//               {/* Submit */}
//               <div>
//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </form>

//             <p className="text-center text-sm text-gray-500 mt-4" style={mystyle}>
//               Already have an account?{' '}
//               <span
//                 onClick={() => setShowSignin(false)}
//                 className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none cursor-pointer"
//                 >
//                 Sign in
//                 </span>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );

return (

   <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

             <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Pin</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Pin className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter 6 digit Pin..."
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
)

};

export default SignUpPage