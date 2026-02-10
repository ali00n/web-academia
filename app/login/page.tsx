'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login')
            }

            // Save token and user info
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('userId', data.user.id)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('email', data.user.email)

            // Redirect to dashboard
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-bg-card p-8 rounded-lg border border-gray-dark shadow-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                            Entrar
                        </h2>
                        <p className="text-text-muted mt-2">Acesse sua conta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-text-color mb-2">
                                Usuário
                            </label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="Seu usuário"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-text-color mb-2">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="Sua senha"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-primary py-3 rounded-lg font-semibold text-white hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-text-muted">
                        Não tem conta?{' '}
                        <Link href="/cadastro" className="text-primary hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
