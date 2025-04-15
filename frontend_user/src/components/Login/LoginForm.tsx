import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '@/api'; // Import the login function from your API file
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const loginData = { email, password };
      const response = await login(loginData); // Call the login API function
      toast({
        title: 'Success!',
        description: 'You have successfully logged in.',
      });

      // Store the token or handle response as necessary
      // For example, storing the token in localStorage or a global state
      localStorage.setItem('token', response.token); // Assuming the response contains a 'token'

      // Redirect to the /user_login page after successful login
      navigate('/user_login');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="fade-in space-y-6">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-500 text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 py-6 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-all"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a
              href="#"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 py-6 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-all"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-600 select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>

        <div className="text-center text-gray-600 text-sm">
        Don't have an account?{' '}
        <Link 
        to="/signup" 
        className="text-primary hover:text-primary/80 font-medium"
        >
        Sign up
        </Link>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;