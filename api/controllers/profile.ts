import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { school: true }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      id: user.id,
      email: user.email,
      full_name: user.name,
      school_id: user.schoolId,
      school_name: user.school?.name || null,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

export const joinSchool = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { school_code } = req.body;

    if (!school_code) {
      res.status(400).json({ success: false, error: 'School code is required' });
      return;
    }

    const school = await prisma.school.findUnique({
      where: { code: school_code.trim() }
    });

    if (!school) {
      res.status(404).json({ success: false, error: 'Invalid school code' });
      return;
    }

    // Link user to school
    await prisma.user.update({
      where: { id: userId },
      data: { schoolId: school.id }
    });

    res.json({ success: true, school_name: school.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error joining school' });
  }
};
