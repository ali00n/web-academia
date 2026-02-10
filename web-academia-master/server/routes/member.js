import express from 'express';
import prisma from '../prisma.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/member/profile - Complete onboarding profile
router.post('/profile', authenticateToken, async (req, res) => {
    try {
        const { fullName, age, weight, height, trainingGoal, selectedPlan, paymentMethod } = req.body;
        const userId = req.user.userId;

        console.log('📋 Creating profile for user:', userId);

        // Validate input
        if (!fullName || !age || !weight || !trainingGoal || !selectedPlan || !paymentMethod) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Upsert profile (create or update)
        const profile = await prisma.memberProfile.upsert({
            where: { userId },
            update: {
                fullName,
                age,
                weight,
                height: height || null,
                trainingGoal,
                selectedPlan,
                paymentMethod
            },
            create: {
                userId,
                fullName,
                age,
                weight,
                height: height || null,
                trainingGoal,
                selectedPlan,
                paymentMethod
            }
        });

        console.log('✅ Profile saved successfully');

        res.status(201).json({
            message: 'Perfil criado com sucesso',
            profile
        });
    } catch (error) {
        console.error('❌ Profile error:', error);
        res.status(500).json({ error: 'Erro ao salvar perfil: ' + error.message });
    }
});

// GET /api/member/profile - Get member profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const profile = await prisma.memberProfile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        username: true,
                        email: true
                    }
                }
            }
        });

        if (!profile) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }

        res.json(profile);
    } catch (error) {
        console.error('❌ Get profile error:', error);
        res.status(500).json({ error: 'Erro ao buscar perfil: ' + error.message });
    }
});

// POST /api/member/attendance - Mark attendance
router.post('/attendance', authenticateToken, async (req, res) => {
    try {
        const { date, status } = req.body;
        const userId = req.user.userId;

        const attendanceDate = date ? new Date(date) : new Date();
        const attendanceStatus = status || 'present';

        console.log('📅 Marking attendance for user:', userId);

        // Upsert attendance
        const attendance = await prisma.attendance.upsert({
            where: {
                unique_attendance: {
                    userId,
                    date: attendanceDate
                }
            },
            update: {
                status: attendanceStatus
            },
            create: {
                userId,
                date: attendanceDate,
                status: attendanceStatus
            }
        });

        console.log('✅ Attendance marked successfully');

        res.json({
            message: 'Presença registrada com sucesso',
            date: attendanceDate,
            attendance
        });
    } catch (error) {
        console.error('❌ Attendance error:', error);
        res.status(500).json({ error: 'Erro ao registrar presença: ' + error.message });
    }
});

// GET /api/member/attendance - Get attendance history
router.get('/attendance', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { limit = '30' } = req.query;

        const attendances = await prisma.attendance.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: parseInt(limit)
        });

        res.json(attendances);
    } catch (error) {
        console.error('❌ Get attendance error:', error);
        res.status(500).json({ error: 'Erro ao buscar histórico de presença: ' + error.message });
    }
});

// GET /api/member/stats - Get member statistics
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get attendance stats
        const attendances = await prisma.attendance.findMany({
            where: { userId }
        });

        const stats = {
            total_records: attendances.length,
            days_present: attendances.filter(a => a.status === 'present').length,
            days_absent: attendances.filter(a => a.status === 'absent').length
        };

        // Get profile for IMC calculation
        const profile = await prisma.memberProfile.findUnique({
            where: { userId },
            select: { weight: true, height: true }
        });

        let imc = null;
        let imcCategory = null;

        if (profile && profile.weight && profile.height) {
            const heightM = Number(profile.height) / 100;
            const weightNum = Number(profile.weight);
            imc = (weightNum / (heightM * heightM)).toFixed(2);

            if (imc < 18.5) imcCategory = 'Abaixo do peso';
            else if (imc < 25) imcCategory = 'Peso normal';
            else if (imc < 30) imcCategory = 'Sobrepeso';
            else imcCategory = 'Obesidade';
        }

        res.json({
            ...stats,
            imc,
            imcCategory,
            weight: profile?.weight,
            height: profile?.height
        });
    } catch (error) {
        console.error('❌ Get stats error:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas: ' + error.message });
    }
});

export default router;
