export default function Footer() {
    return (
        <footer className="bg-bg-secondary border-t border-gray-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo e descrição */}
                    <div>
                        <h3 className="text-xl font-display font-bold gradient-primary bg-clip-text mb-4">
                            Black Fitness
                        </h3>
                        <p className="text-text-muted">
                            Transforme sua vida na melhor academia de Atibaia
                        </p>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h5 className="text-primary font-semibold mb-4">Links Rápidos</h5>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-text-muted hover:text-primary transition-colors">
                                    Início
                                </a>
                            </li>
                            <li>
                                <a href="/cadastro" className="text-text-muted hover:text-primary transition-colors">
                                    Cadastro
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-text-muted hover:text-primary transition-colors">
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h5 className="text-primary font-semibold mb-4">Contato</h5>
                        <ul className="space-y-2 text-text-muted">
                            <li>Rua das Figueiras 38 - Atibaia</li>
                            <li>(11) 9-71736134</li>
                            <li>Com horário marcado</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-dark mt-8 pt-8 text-center text-text-muted text-sm">
                    © {new Date().getFullYear()} Academia Black Fitness. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}
