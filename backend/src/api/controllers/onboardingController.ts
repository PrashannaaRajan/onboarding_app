import { Request, Response } from 'express';
import { saveOnboardingSection } from '../services/userService';

export const saveOnboardingData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).userId;
  const section = parseInt(req.params.section, 10);
  const body = req.body;

  try {
    const updatedFields = await saveOnboardingSection(userId, section, body);
    res.status(200).json({ success: true, updated: updatedFields });
  } catch (err: any) {
    if (err.message === 'invalid_section') {
      res.status(400).json({ error: 'Invalid onboarding section' });
    } else if (err.message === 'no_valid_fields') {
      res.status(400).json({ error: 'No valid fields submitted' });
    } else {
      console.error('Onboarding update error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};
