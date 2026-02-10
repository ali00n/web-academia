'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CadastroPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem')
            return
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao cadastrar')
            }

            // Redirect to login
            router.push('/login?registered=true')
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
                            Criar Conta
                        </h2>
                        <p className="text-text-muted mt-2">Comece sua transformação hoje</p>
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
                                placeholder="Escolha um usuário"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-color mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="seu@email.com"
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
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-color mb-2">
                                Confirmar Senha
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="Repita sua senha"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-primary py-3 rounded-lg font-semibold text-white hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Cadastrando...' : 'Criar Conta'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-text-muted">
                        Já tem conta?{' '}
                        <Link href="/login" className="text-primary hover:underline">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
