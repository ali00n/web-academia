'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-bg-secondary/80 backdrop-blur-lg border-b border-primary/10 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-display font-bold gradient-primary bg-clip-text">
                        Black Fitness
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-text-color hover:text-primary transition-colors font-medium">
                            Início
                        </Link>
                        <Link href="/cadastro" className="text-text-color hover:text-primary transition-colors font-medium">
                            Cadastro
                        </Link>
                        <Link href="/login" className="text-text-color hover:text-primary transition-colors font-medium">
                            Login
                        </Link>
                        <Link href="/calc-imc" className="text-text-color hover:text-primary transition-colors font-medium">
                            Calc IMC
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-text-color hover:bg-gray-dark"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-bg-secondary border-t border-gray-dark">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 rounded-md text-text-color hover:bg-gray-dark">
                            Início
                        </Link>
                        <Link href="/cadastro" className="block px-3 py-2 rounded-md text-text-color hover:bg-gray-dark">
                            Cadastro
                        </Link>
                        <Link href="/login" className="block px-3 py-2 rounded-md text-text-color hover:bg-gray-dark">
                            Login
                        </Link>
                        <Link href="/calc-imc" className="block px-3 py-2 rounded-md text-text-color hover:bg-gray-dark">
                            Calc IMC
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
