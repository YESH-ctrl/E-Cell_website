import { Router, Request, Response } from 'express';
import Inquiry from '../models/Inquiry';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newInquiry = new Inquiry({ name, email, subject, message });
    await newInquiry.save();
    console.log(`📩 New inquiry saved to MongoDB: ${newInquiry._id}`);

    res.status(201).json({ message: 'Inquiry submitted successfully', data: newInquiry });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
