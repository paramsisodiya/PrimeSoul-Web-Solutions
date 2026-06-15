'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Flame, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/admin/login') {
            document.title = 'PrimeSoul Admin Login'
        }
    }, [pathname])

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setError('')

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password)
            router.push('/admin')
        } catch (err) {
            setError('Invalid email or password. Please check your credentials and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0E0E2C] flex items-center justify-center p-4">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7B2FF2] opacity-10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative w-full max-w-md">
                <div className="bg-[#161640] border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B2FF2] to-[#E879F9] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                            <Flame size={28} className="text-white" />
                        </div>
                        <h1 className="text-white text-2xl font-bold">PrimeSoul Admin</h1>
                        <p className="text-[#4A4A6A] text-sm mt-1">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#4A4A6A] text-sm focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-[#7A7A9E] text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-[#0E0E2C] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-[#4A4A6A] text-sm focus:outline-none focus:border-[#7B2FF2] focus:ring-1 focus:ring-[#7B2FF2] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4A6A] hover:text-white transition-colors"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#7B2FF2] to-[#A855F7] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
                        </button>
                    </form>
                </div>
                <p className="text-center text-[#4A4A6A] text-xs mt-6">PrimeSoul Web Solutions · Secure Admin Access</p>
            </div>
        </div>
    )
}
