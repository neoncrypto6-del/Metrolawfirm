import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, Loader2Icon } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { supabase } from '../lib/supabase';
export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      if (data.session) {
        localStorage.setItem('metro_admin_auth', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageTransition className="min-h-screen flex items-center justify-center bg-metro-black px-4">
      <div className="w-full max-w-md bg-metro-surface border border-metro-border p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-metro-gold mx-auto flex items-center justify-center mb-4">
            <LockIcon className="w-5 h-5 text-metro-gold" />
          </div>
          <h1 className="text-2xl font-playfair text-white">Admin Portal</h1>
          <p className="text-metro-muted text-sm mt-2">
            Authorized personnel only
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error &&
          <div className="text-red-500 text-sm text-center bg-red-950/20 py-2 border border-red-900/50">
              {error}
            </div>
          }

          <div>
            <label className="block text-xs tracking-widest uppercase text-metro-muted mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors tracking-wide" />

          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-metro-muted mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-metro-black border border-metro-border px-4 py-3 text-white focus:outline-none focus:border-metro-gold transition-colors tracking-widest" />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-metro-gold text-metro-black font-medium tracking-wider uppercase py-3 hover:bg-metro-gold-hover transition-colors disabled:opacity-70 flex items-center justify-center gap-2">

            {loading ?
            <>
                <Loader2Icon className="w-5 h-5 animate-spin" />
                Authenticating...
              </> :

            'Authenticate'
            }
          </button>
        </form>
      </div>
    </PageTransition>);

}