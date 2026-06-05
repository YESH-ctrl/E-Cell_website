import { Router, Request, Response } from 'express';
import Application from '../models/Application';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      rollNumber,
      branch,
      yearOfStudy,
      mobileNumber,
      emailID,
      linkedInProfile,
      portfolioUrl,
      pastClubMember,
      pastClubDetails,
      organizedEvent,
      organizedEventDetails,
      bestDescribesYou,
      preferredDomains,
      teamCrisisAnswer,
      opportunityAnswer,
      leadershipAnswer,
      foundersOfficeAnswer,
      impactAnswer,
      whyJoin,
      solveProblem,
      takeInitiative,
      tenThousandRupees,
      successMeaning
    } = req.body;
    
    // Validate required fields
    if (
      !fullName ||
      !rollNumber ||
      !branch ||
      !yearOfStudy ||
      !mobileNumber ||
      !emailID ||
      !pastClubMember ||
      !organizedEvent ||
      !bestDescribesYou ||
      !preferredDomains ||
      !Array.isArray(preferredDomains) ||
      preferredDomains.length === 0 ||
      !teamCrisisAnswer ||
      !opportunityAnswer ||
      !leadershipAnswer ||
      !foundersOfficeAnswer ||
      !impactAnswer ||
      !whyJoin ||
      !solveProblem ||
      !takeInitiative ||
      !tenThousandRupees ||
      !successMeaning
    ) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const newApplication = new Application({
      fullName,
      rollNumber,
      branch,
      yearOfStudy,
      mobileNumber,
      emailID,
      linkedInProfile: linkedInProfile || '',
      portfolioUrl: portfolioUrl || '',
      pastClubMember,
      pastClubDetails: pastClubDetails || '',
      organizedEvent,
      organizedEventDetails: organizedEventDetails || '',
      bestDescribesYou,
      preferredDomains,
      teamCrisisAnswer,
      opportunityAnswer,
      leadershipAnswer,
      foundersOfficeAnswer,
      impactAnswer,
      whyJoin,
      solveProblem,
      takeInitiative,
      tenThousandRupees,
      successMeaning
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
