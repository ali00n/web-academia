import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username e password são obrigatórios' },
                { status: 400 }
            )
        }

        // Find user
        const user = await prisma.users.findUnique({
            where: { email: username },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado. Por favor, faça cadastro.' },
                { status: 401 }
            )
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Senha incorreta' },
                { status: 401 }
            )
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        console.log('✅ Login successful:', user.email)

        return NextResponse.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                username: user.email.split('@')[0],
                email: user.email,
            },
        })
    } catch (error: any) {
        console.error('❌ Login error:', error)
        return NextResponse.json(
            { error: 'Erro ao fazer login: ' + error.message },
            { status: 500 }
        )
    }
}
