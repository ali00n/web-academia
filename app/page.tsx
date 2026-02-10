'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [stats, setStats] = useState({ members: 0, activeMembersToday: 0 })

    useEffect(() => {
        // Fetch stats from API
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => setStats({ members: 150, activeMembersToday: 45 })) // Fallback
    }, [])

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative gradient-dark py-20 md:py-32 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6">
                            <span className="gradient-primary bg-clip-text text-transparent">
                                Transforme
                            </span>
                            <br />
                            Seu Corpo
                        </h1>

                        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
                            Alcance seus objetivos com equipamentos de última geração, treinadores especializados e uma comunidade motivada.
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                                    {stats.members}+
                                </div>
                                <div className="text-text-muted">Membros Ativos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                                    {stats.activeMembersToday}
                                </div>
                                <div className="text-text-muted">Treinos Hoje</div>
                            </div>
                        </div>

                        <Link
                            href="/cadastro"
                            className="inline-block gradient-primary px-8 py-4 rounded-lg font-semibold text-white text-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                        >
                            Começar Agora →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-bg-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Por que escolher a <span className="gradient-primary bg-clip-text text-transparent">Black Fitness</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-bg-card p-8 rounded-lg border border-gray-dark hover:border-primary/50 transition-all duration-300">
                            <div className="text-4xl mb-4">💪</div>
                            <h3 className="text-xl font-display font-semibold mb-3">Equipamentos Modernos</h3>
                            <p className="text-text-muted">Máquinas de última geração para um treino completo e eficiente</p>
                        </div>

                        <div className="bg-bg-card p-8 rounded-lg border border-gray-dark hover:border-primary/50 transition-all duration-300">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-display font-semibold mb-3">Treinadores Especializados</h3>
                            <p className="text-text-muted">Profissionais dedicados para guiar sua jornada fitness</p>
                        </div>

                        <div className="bg-bg-card p-8 rounded-lg border border-gray-dark hover:border-primary/50 transition-all duration-300">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-display font-semibold mb-3">Comunidade Motivada</h3>
                            <p className="text-text-muted">Ambiente acolhedor com pessoas focadas em resultados</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-20 gradient-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Horário */}
                        <div className="bg-bg-card/50 backdrop-blur p-8 rounded-lg border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">⏰</div>
                                <div>
                                    <h3 className="text-xl font-display font-semibold mb-2">Horário de Funcionamento</h3>
                                    <p className="text-text-muted">Com horário marcado</p>
                                </div>
                            </div>
                        </div>

                        {/* Localização */}
                        <div className="bg-bg-card/50 backdrop-blur p-8 rounded-lg border border-primary/20">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">📍</div>
                                <div>
                                    <h3 className="text-xl font-display font-semibold mb-2">Localização</h3>
                                    <p className="text-text-muted">Rua das Figueiras 38 - Atibaia</p>
                                    <p className="text-text-muted">(11) 9-71736134</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-bg-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Pronto para <span className="gradient-primary bg-clip-text text-transparent">começar sua transformação</span>?
                    </h2>
                    <p className="text-lg text-text-muted mb-8">
                        Junte-se a centenas de pessoas que já estão alcançando seus objetivos
                    </p>
                    <Link
                        href="/cadastro"
                        className="inline-block gradient-primary px-8 py-4 rounded-lg font-semibold text-white text-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                    >
                        Fazer Cadastro
                    </Link>
                </div>
            </section>
        </div>
    )
}
