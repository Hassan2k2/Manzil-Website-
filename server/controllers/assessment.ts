import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const saveProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const data = req.body;
    
    // Check if an assessment already exists for the user
    let assessment = await prisma.assessment.findFirst({
      where: { userId }
    });

    if (assessment) {
      assessment = await prisma.assessment.update({
        where: { id: assessment.id },
        data: {
          currentStep: data.current_step,
          riasecAnswers: data.riasec_answers,
          valuesAnswers: data.values_answers,
          bigFiveAnswers: data.big_five_answers,
          riasecScores: data.riasec_scores,
          topRiasecCodes: data.top_riasec_codes || [],
          valuesScores: data.value_scores,
          bigFiveScores: data.big_five_scores,
          majorResults: data.major_results,
        }
      });
    } else {
      assessment = await prisma.assessment.create({
        data: {
          userId,
          currentStep: data.current_step || 'welcome',
          riasecAnswers: data.riasec_answers || {},
          valuesAnswers: data.values_answers || {},
          bigFiveAnswers: data.big_five_answers || {},
          riasecScores: data.riasec_scores || {},
          topRiasecCodes: data.top_riasec_codes || [],
          valuesScores: data.value_scores || {},
          bigFiveScores: data.big_five_scores || {},
          majorResults: data.major_results || [],
        }
      });
    }

    res.json({ message: 'Progress saved successfully', assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving progress' });
  }
};

export const getProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const assessment = await prisma.assessment.findFirst({
      where: { userId }
    });

    if(!assessment) {
      res.json(null);
      return;
    }

    res.json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching progress' });
  }
};
