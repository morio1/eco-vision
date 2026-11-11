import { write } from '../lib/storage';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Leaf, Mail, Lock } from 'lucide-react';
import { Separator } from './ui/separator';

interface NewLoginPageProps {
  onLogin: () => void;
}

export function NewLoginPage({ onLogin }: NewLoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('nigeria');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try { write('profile', { name: name.trim() || email.split('@')[0], email, country }); } catch { toast.error('Could not save profile on this browser.'); return; }
    onLogin();
  };

  const handleGoogleLogin = () => {
    toast.info('Google sign-in needs an online authentication service. Use the local demo form.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] via-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="w-32 h-32 text-[#4CAF50]" />
        </div>
        <div className="absolute bottom-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="w-40 h-40 text-[#4CAF50]" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Leaf className="w-24 h-24 text-[#4CAF50]" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-3xl shadow-lg mb-4">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-[#1B5E20] mb-2">ECO-VISION</h1>
          <p className="text-[#558B2F]">Local demo — profile saved on this device; no real account is created.</p>
        </div>

        <Card className="border-[#C8E6C9] shadow-xl rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-[#1B5E20]">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Country Selector */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-[#1B5E20]">Select Your Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger id="country" className="h-12 rounded-2xl border-[#C8E6C9]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
                  <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-[#C8E6C9]" />

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-2xl border-[#C8E6C9] hover:bg-[#E8F5E9] hover:border-[#4CAF50]"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <Separator className="bg-[#C8E6C9]" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-[#558B2F]">
                or
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#1B5E20]">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Adebayo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9] focus:border-[#4CAF50]"
                    required={isSignup}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1B5E20]">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#558B2F]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9] focus:border-[#4CAF50] pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1B5E20]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#558B2F]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9] focus:border-[#4CAF50] pl-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-lg"
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#4CAF50] hover:underline"
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-[#558B2F] mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
