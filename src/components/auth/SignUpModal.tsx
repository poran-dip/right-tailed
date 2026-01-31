'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Sign up failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem('studentId', data.student.id);
      toast.success("Signed up successfully");
      router.push('/dashboard');

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

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

      <div className="relative w-full h-[93vh] max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="w-5 h-5 cursor-pointer text-gray-500 dark:text-gray-400" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start your journey to exam success
            </p>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={name}
                  required
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-purple-400 focus:outline-none"
                />
                <button type="button" onClick={() => setShowConfirmPassword(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
                </button>
              </div>
            </div>

            <button onClick={handleSignUp} disabled={isLoading} className={`w-full py-3 mt-4 rounded-lg text-white font-bold transition-all
                ${isLoading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                }`}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <button onClick={onSwitchToSignIn} className="ml-1 text-purple-600 cursor-pointer font-semibold hover:underline">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
