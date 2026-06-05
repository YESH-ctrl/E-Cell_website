import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  fullName: string;
  rollNumber: string;
  branch: string;
  yearOfStudy: string;
  mobileNumber: string;
  emailID: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  pastClubMember: string;
  pastClubDetails?: string;
  organizedEvent: string;
  organizedEventDetails?: string;
  bestDescribesYou: string;
  preferredDomains: string[];
  teamCrisisAnswer: string;
  opportunityAnswer: string;
  leadershipAnswer: string;
  foundersOfficeAnswer: string;
  impactAnswer: string;
  whyJoin: string;
  solveProblem: string;
  takeInitiative: string;
  tenThousandRupees: string;
  successMeaning: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  branch: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailID: { type: String, required: true },
  linkedInProfile: { type: String, default: '' },
  portfolioUrl: { type: String, default: '' },
  pastClubMember: { type: String, required: true },
  pastClubDetails: { type: String, default: '' },
  organizedEvent: { type: String, required: true },
  organizedEventDetails: { type: String, default: '' },
  bestDescribesYou: { type: String, required: true },
  preferredDomains: { type: [String], required: true },
  teamCrisisAnswer: { type: String, required: true },
  opportunityAnswer: { type: String, required: true },
  leadershipAnswer: { type: String, required: true },
  foundersOfficeAnswer: { type: String, required: true },
  impactAnswer: { type: String, required: true },
  whyJoin: { type: String, required: true },
  solveProblem: { type: String, required: true },
  takeInitiative: { type: String, required: true },
  tenThousandRupees: { type: String, required: true },
  successMeaning: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);
