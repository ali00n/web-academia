'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('authToken')
        const username = localStorage.getItem('username')
        const email = localStorage.getItem('email')

        if (!token) {
            router.push('/login')
            return
        }

        setUser({ username, email })
        setLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.clear()
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
                <div className="text-2xl font-display">Carregando...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold">
                            Bem-vindo, <span className="gradient-primary bg-clip-text text-transparent">{user?.username}</span>!
                        </h1>
                        <p className="text-text-muted mt-2">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
                    >
                        Sair
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-bg-card p-6 rounded-lg border border-gray-dark hover:border-primary/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-muted text-sm">Treinos Este Mês</p>
                                <p className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">12</p>
                            </div>
                            <div className="text-4xl">🔥</div>
                        </div>
                    </div>

                    <div className="bg-bg-card p-6 rounded-lg border border-gray-dark hover:border-primary/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-muted text-sm">Sequência</p>
                                <p className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">5 dias</p>
                            </div>
                            <div className="text-4xl">🏆</div>
                        </div>
                    </div>

                    <div className="bg-bg-card p-6 rounded-lg border border-gray-dark hover:border-primary/50 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-muted text-sm">Meta Mensal</p>
                                <p className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">80%</p>
                            </div>
                            <div className="text-4xl">🎯</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Card */}
                    <div className="bg-bg-card p-8 rounded-lg border border-gray-dark">
                        <h2 className="text-2xl font-display font-bold mb-6">Seu Perfil</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-text-muted text-sm">Usuário</label>
                                <p className="text-text-color text-lg">{user?.username}</p>
                            </div>
                            <div>
                                <label className="text-text-muted text-sm">Email</label>
                                <p className="text-text-color text-lg">{user?.email}</p>
                            </div>
                            <div>
                                <label className="text-text-muted text-sm">Plano</label>
                                <p className="text-text-color text-lg">Premium</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-bg-card p-8 rounded-lg border border-gray-dark">
                        <h2 className="text-2xl font-display font-bold mb-6">Atividade Recente</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-bg-dark rounded-lg">
                                <div className="text-2xl">💪</div>
                                <div>
                                    <p className="font-semibold">Treino de Peito e Tríceps</p>
                                    <p className="text-text-muted text-sm">Hoje, 08:30</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-bg-dark rounded-lg">
                                <div className="text-2xl">🏃</div>
                                <div>
                                    <p className="font-semibold">Cardio 30min</p>
                                    <p className="text-text-muted text-sm">Ontem, 18:00</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-bg-dark rounded-lg">
                                <div className="text-2xl">🦵</div>
                                <div>
                                    <p className="font-semibold">Treino de Pernas</p>
                                    <p className="text-text-muted text-sm">2 dias atrás, 07:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
