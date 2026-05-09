import { Router, Request, Response } from 'express';
import Application from '../models/Application';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { fullName, email, rollNumber, department, year, reason } = req.body;
    
    if (!fullName || !email || !rollNumber || !department || !year || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newApplication = new Application({
      fullName,
      email,
      rollNumber,
      department,
      year,
      reason,
    });
    
    await newApplication.save();
    console.log(`🚀 New application saved to MongoDB: ${newApplication._id}`);

    res.status(201).json({ message: 'Application submitted successfully', data: newApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
