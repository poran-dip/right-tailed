'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, Github, Chrome } from 'lucide-react';

interface SignInDialogProps {
  onClose: () => void;
}

const SignInDialog = ({ onClose }: SignInDialogProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-purple-600 bg-clip-text text-transparent mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp
                ? 'Start your journey to exam success'
                : 'Sign in to continue your preparation'}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  placeholder='Enter your email'
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  placeholder='Enter your password'
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <p className='text-sm flex mt-3 w-full'>Forgot your password? <span className='ml-auto underline text-purple-500 cursor-pointer'>Click here</span></p>

            <button className="w-full py-3 mt-4 bg-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:bg-purple-700 cursor-pointer transition-all">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">
                Or continue with Google
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 cursor-pointer h-12 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-semibold">
              <img src="/Google.png" alt="" className='h-6 w-6'/>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 dark:text-purple-400 cursor-pointer font-semibold hover:underline"
            >
              <p className='ml-1'>{isSignUp ? 'Sign In' : 'Sign Up'}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
