import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json()

        console.log('📝 Register attempt:', { username, email })

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existing = await prisma.users.findFirst({
            where: {
                OR: [{ email }],
            },
        })

        if (existing) {
            return NextResponse.json(
                { error: 'Email já está cadastrado' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                role: 'member',
            },
        })

        console.log('✅ User registered successfully:', user.id)

        return NextResponse.json(
            {
                message: 'Usuário registrado com sucesso',
                userId: user.id,
            },
            { status: 201 }
        )
    } catch (error: any) {
        console.error('❌ Register error:', error)
        return NextResponse.json(
            { error: 'Erro ao registrar usuário: ' + error.message },
            { status: 500 }
        )
    }
}
