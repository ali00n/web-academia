'use client'

import { useState } from 'react'

export default function CalcIMCPage() {
    const [formData, setFormData] = useState({ weight: '', height: '' })
    const [result, setResult] = useState<{ imc: number; category: string } | null>(null)

    const calculateIMC = (e: React.FormEvent) => {
        e.preventDefault()

        const weight = parseFloat(formData.weight)
        const height = parseFloat(formData.height)

        if (weight <= 0 || height <= 0) {
            alert('Por favor, insira valores válidos')
            return
        }

        const imc = weight / (height * height)
        let category = ''

        if (imc < 18.5) category = 'Abaixo do peso'
        else if (imc < 25) category = 'Peso normal'
        else if (imc < 30) category = 'Sobrepeso'
        else category = 'Obesidade'

        setResult({ imc: parseFloat(imc.toFixed(2)), category })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-bg-card p-8 rounded-lg border border-gray-dark shadow-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                            Calculadora de IMC
                        </h2>
                        <p className="text-text-muted mt-2">Índice de Massa Corporal</p>
                    </div>

                    <form onSubmit={calculateIMC} className="space-y-6">
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-text-color mb-2">
                                Peso (kg)
                            </label>
                            <input
                                id="weight"
                                type="number"
                                step="0.1"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="Ex: 70"
                            />
                        </div>

                        <div>
                            <label htmlFor="height" className="block text-sm font-medium text-text-color mb-2">
                                Altura (m)
                            </label>
                            <input
                                id="height"
                                type="number"
                                step="0.01"
                                required
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                className="w-full px-4 py-3 bg-bg-dark border border-gray-dark rounded-lg focus:outline-none focus:border-primary text-text-color"
                                placeholder="Ex: 1.75"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full gradient-primary py-3 rounded-lg font-semibold text-white hover:shadow-glow transition-all duration-300"
                        >
                            Calcular IMC
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 p-6 bg-gradient-primary rounded-lg text-center">
                            <p className="text-white text-sm mb-2">Seu IMC é</p>
                            <p className="text-white text-5xl font-display font-bold mb-2">{result.imc}</p>
                            <p className="text-white text-xl font-semibold">{result.category}</p>
                        </div>
                    )}

                    {/* IMC Table */}
                    <div className="mt-8 space-y-2 text-sm">
                        <p className="font-semibold text-text-color mb-3">Referência IMC:</p>
                        <div className="flex justify-between text-text-muted">
                            <span>Abaixo do peso:</span>
                            <span>&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between text-text-muted">
                            <span>Peso normal:</span>
                            <span>18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between text-text-muted">
                            <span>Sobrepeso:</span>
                            <span>25 - 29.9</span>
                        </div>
                        <div className="flex justify-between text-text-muted">
                            <span>Obesidade:</span>
                            <span>≥ 30</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
