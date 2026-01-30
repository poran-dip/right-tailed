'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

interface SignInModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal = ({ onClose, onSwitchToSignUp }: SignInModalProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email) {
      toast.warn("Please enter your email!")
      return
    }
    if (!password) {
      toast.warn("Please enter a password!")
      return
    }

    try {
      setIsLoading(true)

      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Sign in failed")
        setIsLoading(false)
        return
      }

      localStorage.setItem('studentId', data.student.id)
      toast.success("Signed in successfully")
      router.push('/dashboard')

    } catch (err) {
      toast.error("Something went wrong. Try again.")
      setIsLoading(false)
    }
  }



  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue your preparation
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none" /
                >
                <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? (<Eye className="w-5 h-5 cursor-pointer" />) : (<EyeOff className="w-5 h-5 cursor-pointer" />)}
                </button>
              </div>
            </div>

            <p className="text-sm flex mt-2">
              Forgot your password?
              <span className="ml-auto underline text-purple-500 cursor-pointer">
                Click here
              </span>
            </p>

            <button onClick={handleSignIn} disabled={isLoading} className={`w-full text-white transition-all duration-300 bg-purple-600 py-3 mt-4 rounded-lg font-bold transition-all${isLoading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                }`}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
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
              <img src="/Google.png" alt="" className="h-6 w-6" />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?
            <button onClick={onSwitchToSignUp} className="ml-1 text-purple-600 cursor-pointer font-semibold hover:underline">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
