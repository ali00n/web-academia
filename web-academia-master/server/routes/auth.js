import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log('📝 Register attempt:', { username, email });

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Check if user already exists
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (existing) {
            return res.status(409).json({ error: 'Usuário ou email já existe' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        console.log('✅ User registered successfully:', user.id);

        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            userId: user.id
        });
    } catch (error) {
        console.error('❌ Register error:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário: ' + error.message });
    }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('🔐 Login attempt:', username);

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username e password são obrigatórios' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado. Por favor, faça cadastro.' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('✅ Login successful:', user.username);

        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Erro ao fazer login: ' + error.message });
    }
});

export default router;
