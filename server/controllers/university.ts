import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getAllUniversities = async (req: Request, res: Response): Promise<void> => {
  try {
    const universities = await prisma.university.findMany();
    res.json(universities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching universities' });
  }
};

export const getUniversityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const university = await prisma.university.findUnique({
      where: { id: id as string }
    });
    
    if (!university) {
      res.status(404).json({ message: 'University not found' });
      return;
    }

    res.json(university);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching university' });
  }
};

export const createUniversity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, location, ranking, tuition, website, programs } = req.body;
    
    // Only admins should ideally call this, but simplified here
    const role = (req as any).user.role;
    if (role !== 'SUPER_ADMIN' && role !== 'SCHOOL_ADMIN') {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const university = await prisma.university.create({
      data: {
        name,
        description,
        location,
        ranking,
        tuition,
        website,
        programs,
      }
    });

    res.status(201).json(university);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating university' });
  }
};

export const saveUniversityMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { matches, preferences } = req.body;

    if (!matches || !Array.isArray(matches)) {
      res.status(400).json({ message: 'Invalid matches data' });
      return;
    }

    // Get user to find their schoolId if available
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const schoolId = user?.schoolId;

    // Delete existing matches for this user to avoid duplication (optional, based on preference)
    // For now, let's just insert new ones but we could filter by preferences
    
    const dbMatches = await Promise.all(matches.map(async (m: any) => {
      const matchData: any = {
        universityName: m.university_name,
        universityCountry: m.university_country,
        userId: userId,
        schoolId: schoolId || undefined,
        tier: m.tier,
        score: m.score,
        preferences: preferences,
      };
      return prisma.universityMatch.create({
        data: matchData
      });
    }));

    res.status(201).json({ message: 'Matches saved successfully', count: dbMatches.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving university matches' });
  }
};

export const getPakistanPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, city, major, degree } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { university_name: { contains: search as string, mode: 'insensitive' } },
        { program: { contains: search as string, mode: 'insensitive' } },
        { city: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }

    if (major) {
      where.program = { contains: major as string, mode: 'insensitive' };
    }

    if (degree) {
      where.degree = { contains: degree as string, mode: 'insensitive' };
    }

    const programs = await prisma.pakistanProgram.findMany({
      where,
      orderBy: {
        university_name: 'asc'
      }
    });

    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching programs' });
  }
};
