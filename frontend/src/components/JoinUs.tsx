import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, UserPlus, User, ClipboardList, Layers, FileText } from 'lucide-react';

const domains = [
  'Marketing',
  'Operations',
  'Content & Branding',
  'Technology',
  'Startup Research',
  'Partnerships & Outreach',
  'Events & Experiences',
  'Finance',
  'Talent & Recruitment'
];

const descriptors = [
  { key: 'Builder', label: 'Builder', desc: 'I like creating things' },
  { key: 'Leader', label: 'Leader', desc: 'I like managing people' },
  { key: 'Operator', label: 'Operator', desc: 'I like executing tasks' },
  { key: 'Strategist', label: 'Strategist', desc: 'I like planning' },
  { key: 'Creative Thinker', label: 'Creative Thinker', desc: 'I like generating ideas' }
];

const mcqs = [
  {
    id: 'teamCrisisAnswer',
    title: '1. The Team Crisis Question',
    question: 'Your team is preparing for a major event. Two days before the event, one of the most important members stops responding and has not completed their work.\n\nWhat would you MOST LIKELY do?',
    options: [
      { key: 'A', text: 'Complete their work yourself to ensure the event succeeds.' },
      { key: 'B', text: 'Immediately inform the team lead and wait for further instructions.' },
      { key: 'C', text: 'Contact the member, understand the issue, and simultaneously create a backup plan.' },
      { key: 'D', text: 'Reassign the work among available team members and move forward.' },
    ]
  },
  {
    id: 'opportunityAnswer',
    title: '2. The Opportunity Question',
    question: 'You receive two opportunities at the same time:\n• Lead a difficult project with high visibility but high risk of failure.\n• Join a successful team where results are almost guaranteed.\n\nWhich would you choose?',
    options: [
      { key: 'A', text: 'The successful team because results matter most.' },
      { key: 'B', text: 'The difficult project because growth comes from challenges.' },
      { key: 'C', text: 'Whichever aligns better with my long-term goals.' },
      { key: 'D', text: 'I would first assess the people involved before deciding.' },
    ]
  },
  {
    id: 'leadershipAnswer',
    title: '3. The Leadership Question',
    question: 'You notice your team is following instructions perfectly but lacks creativity and initiative.\n\nWhat would you do?',
    options: [
      { key: 'A', text: 'Maintain the current system since work is getting done.' },
      { key: 'B', text: 'Encourage experimentation even if mistakes happen.' },
      { key: 'C', text: 'Introduce small challenges to gradually build initiative.' },
      { key: 'D', text: 'Identify the most proactive members and give them more responsibility.' },
    ]
  },
  {
    id: 'foundersOfficeAnswer',
    title: '4. The Founder\'s Office Question',
    question: 'You are given a project with no instructions, no clear process, and no previous examples.\n\nWhat is your first reaction?',
    options: [
      { key: 'A', text: 'Ask for detailed guidance before beginning.' },
      { key: 'B', text: 'Research similar examples and create a plan.' },
      { key: 'C', text: 'Start immediately and learn while executing.' },
      { key: 'D', text: 'Gather a small group and brainstorm multiple approaches.' },
    ]
  },
  {
    id: 'impactAnswer',
    title: '5. The Impact Question',
    question: 'You have one free weekend and can only choose ONE activity.',
    options: [
      { key: 'A', text: 'Attend a workshop to learn a new skill.' },
      { key: 'B', text: 'Build a small project using skills you already know.' },
      { key: 'C', text: 'Meet professionals and expand your network.' },
      { key: 'D', text: 'Analyze a problem and design a solution for it.' },
    ]
  }
];

const shortAnswers = [
  {
    id: 'whyJoin',
    label: '1. Why do you want to join E-Cell?',
    maxWords: 150,
    placeholder: 'Tell us why you want to be a part of the E-Cell community, what you hope to learn, and how you plan to contribute...',
  },
  {
    id: 'solveProblem',
    label: '2. What is one problem in your college, city, or society that you would like to solve and why?',
    maxWords: 200,
    placeholder: 'Describe the problem clearly and explain your personal connection to it, along with any ideas you have to address it...',
  },
  {
    id: 'takeInitiative',
    label: '3. Tell us about a situation where you took initiative without being asked.',
    maxWords: 200,
    placeholder: 'What was the context? What did you decide to do, and what was the outcome? Highlight your drive and proactive nature...',
  },
  {
    id: 'tenThousandRupees',
    label: '4. If we gave you ₹10,000 and one month to create impact on campus, what would you do?',
    maxWords: 250,
    placeholder: 'Be specific, creative, and action-oriented. Walk us through your budget allocation and expected execution steps...',
  },
  {
    id: 'successMeaning',
    label: '5. What does success mean to you?',
    maxWords: 150,
    placeholder: 'Share your personal definition of success, whether it is personal growth, community impact, or something else...',
  }
];

export default function JoinUs() {
  const [step, setStep] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: '',
    rollNumber: '',
    branch: '',
    yearOfStudy: '',
    mobileNumber: '',
    emailID: '',
    linkedInProfile: '',
    portfolioUrl: '',
    pastClubMember: '',
    pastClubDetails: '',
    organizedEvent: '',
    organizedEventDetails: '',
    bestDescribesYou: '',
    teamCrisisAnswer: '',
    opportunityAnswer: '',
    leadershipAnswer: '',
    foundersOfficeAnswer: '',
    impactAnswer: '',
    whyJoin: '',
    solveProblem: '',
    takeInitiative: '',
    tenThousandRupees: '',
    successMeaning: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const getWordCount = (text: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          form.fullName.trim() !== '' &&
          form.rollNumber.trim() !== '' &&
          form.branch.trim() !== '' &&
          form.yearOfStudy !== '' &&
          form.mobileNumber.trim().length >= 10 &&
          /\S+@\S+\.\S+/.test(form.emailID)
        );
      case 2:
        const clubOk =
          form.pastClubMember === 'No' ||
          (form.pastClubMember === 'Yes' && form.pastClubDetails.trim() !== '');
        const eventOk =
          form.organizedEvent === 'No' ||
          (form.organizedEvent === 'Yes' && form.organizedEventDetails.trim() !== '');
        return clubOk && eventOk && form.bestDescribesYou !== '';
      case 3:
        return (
          selectedDomains.length >= 1 &&
          selectedDomains.length <= 2 &&
          form.teamCrisisAnswer !== '' &&
          form.opportunityAnswer !== '' &&
          form.leadershipAnswer !== '' &&
          form.foundersOfficeAnswer !== '' &&
          form.impactAnswer !== ''
        );
      case 4:
        return (
          form.whyJoin.trim() !== '' &&
          getWordCount(form.whyJoin) <= 150 &&
          form.solveProblem.trim() !== '' &&
          getWordCount(form.solveProblem) <= 200 &&
          form.takeInitiative.trim() !== '' &&
          getWordCount(form.takeInitiative) <= 200 &&
          form.tenThousandRupees.trim() !== '' &&
          getWordCount(form.tenThousandRupees) <= 250 &&
          form.successMeaning.trim() !== '' &&
          getWordCount(form.successMeaning) <= 150
        );
      default:
        return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else if (selectedDomains.length < 2) {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleNext = () => {
    if (isStepValid() && step < 4) {
      setStep(step + 1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...form,
        preferredDomains: selectedDomains,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000'}/api/applications`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stepVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const stepsList = [
    { num: 1, title: 'Personal Details', icon: User },
    { num: 2, title: 'Background Info', icon: ClipboardList },
    { num: 3, title: 'Domain Preferences', icon: Layers },
    { num: 4, title: 'Short Answers', icon: FileText },
  ];

  return (
    <section id="join" ref={containerRef} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e]/40 to-[#030712]" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-radial from-sky-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-500/20 text-sky-400 text-sm font-medium mb-6">
            <UserPlus size={14} /> Cohort 2026 Recruitment
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-poppins mb-6">
            <span className="text-white">Join the </span>
            <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            Ready to build, lead, and grow? Fill out the recruitment form below to apply for the E-Cell team.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="relative flex justify-between items-center max-w-2xl mx-auto">
            {/* Background progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            
            {/* Active progress line */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-sky-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {stepsList.map((s) => {
              const Icon = s.icon;
              const isActive = step >= s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                      isCurrent 
                        ? 'bg-sky-500 border-sky-400 text-white glow-blue scale-110'
                        : isActive
                          ? 'bg-sky-950 border-sky-500 text-sky-400'
                          : 'bg-[#0b1329] border-white/10 text-white/40'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className={`text-[10px] md:text-xs font-semibold mt-2 tracking-wider uppercase transition-colors duration-300 hidden sm:block ${
                    isCurrent ? 'text-sky-400 font-bold' : isActive ? 'text-white/80' : 'text-white/30'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-3xl p-12 text-center border border-sky-500/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500/20 to-sky-700/20 border border-sky-500/30 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                  <CheckCircle size={40} className="text-sky-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white font-poppins mb-4">
                  Application Submitted!
                </h3>
                <p className="text-white/50 text-base mb-6 max-w-md mx-auto">
                  Thank you, <span className="text-sky-400 font-semibold">{form.fullName}</span>! We have received your details. Our team will review your application and contact you soon.
                </p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {['🎉', '🚀', '💡', '⚡', '🌟', '🔥'].map((emoji, i) => (
                    <span key={i} className="text-xl">{emoji}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key={step}
              onSubmit={handleSubmit}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-8"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white font-poppins flex items-center gap-2 mb-2">
                      SECTION 1: PERSONAL INFORMATION
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-6">Basic Details</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Jane Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Roll Number *</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={form.rollNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 23XX1A05XX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Branch *</label>
                      <input
                        type="text"
                        name="branch"
                        value={form.branch}
                        onChange={handleInputChange}
                        required
                        placeholder="Computer Science, Electronics, etc."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Year of Study *</label>
                      <select
                        name="yearOfStudy"
                        value={form.yearOfStudy}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm appearance-none"
                        style={{ background: 'rgba(255,255,255,0.05)', color: form.yearOfStudy ? 'white' : 'rgba(255,255,255,0.2)' }}
                      >
                        <option value="" disabled style={{ background: '#030712' }}>Select Year</option>
                        {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post Graduate'].map((y) => (
                          <option key={y} value={y} style={{ background: '#030712' }}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={form.mobileNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="10-digit number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Email ID *</label>
                      <input
                        type="email"
                        name="emailID"
                        value={form.emailID}
                        onChange={handleInputChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">LinkedIn Profile (Optional)</label>
                      <input
                        type="url"
                        name="linkedInProfile"
                        value={form.linkedInProfile}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Portfolio/GitHub/Behance (Optional)</label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={form.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Background Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white font-poppins mb-2">
                      SECTION 1: PERSONAL INFORMATION
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-6">Background Information</p>
                  </div>

                  {/* Club Membership */}
                  <div className="space-y-3">
                    <label className="block text-sm text-white/80 font-medium">
                      1. Have you previously been part of any student clubs or organizations? *
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, pastClubMember: opt, pastClubDetails: opt === 'No' ? '' : form.pastClubDetails })}
                          className={`flex-1 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                            form.pastClubMember === opt
                              ? 'border-sky-500/50 bg-sky-500/10 text-white'
                              : 'border-white/5 bg-white/3 text-white/60 hover:bg-white/5'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {form.pastClubMember === 'Yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2"
                      >
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Please specify details: *</label>
                        <textarea
                          name="pastClubDetails"
                          value={form.pastClubDetails}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          placeholder="List the club(s) and briefly your roles or responsibilities..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Event Organization */}
                  <div className="space-y-3">
                    <label className="block text-sm text-white/80 font-medium">
                      2. Have you ever organized or managed an event? *
                    </label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm({ ...form, organizedEvent: opt, organizedEventDetails: opt === 'No' ? '' : form.organizedEventDetails })}
                          className={`flex-1 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                            form.organizedEvent === opt
                              ? 'border-sky-500/50 bg-sky-500/10 text-white'
                              : 'border-white/5 bg-white/3 text-white/60 hover:bg-white/5'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {form.organizedEvent === 'Yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2"
                      >
                        <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">Describe briefly: *</label>
                        <textarea
                          name="organizedEventDetails"
                          value={form.organizedEventDetails}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          placeholder="What event was it, and what were your roles/contributions?"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all duration-300 text-sm resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Self Descriptor */}
                  <div className="space-y-3">
                    <label className="block text-sm text-white/80 font-medium">
                      3. Which of the following best describes you? *
                    </label>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {descriptors.map((desc) => {
                        const isSelected = form.bestDescribesYou === desc.key;
                        return (
                          <button
                            key={desc.key}
                            type="button"
                            onClick={() => setForm({ ...form, bestDescribesYou: desc.key })}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between ${
                              isSelected
                                ? 'border-sky-500/50 bg-sky-500/10 text-white'
                                : 'border-white/5 bg-white/3 text-white/60 hover:bg-white/5'
                            }`}
                          >
                            <span className="font-bold text-sm text-white mb-1">{desc.label}</span>
                            <span className="text-white/40 text-xs leading-relaxed">{desc.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Domain Preference & MCQ */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white font-poppins mb-2">
                      SECTION 2: DOMAIN PREFERENCE
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-6">Select your preferred domains (Choose up to 2) *</p>
                  </div>

                  {/* Domain Selector */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {domains.map((dom) => {
                      const isSelected = selectedDomains.includes(dom);
                      const isDisabled = !isSelected && selectedDomains.length >= 2;
                      return (
                        <button
                          key={dom}
                          type="button"
                          onClick={() => toggleDomain(dom)}
                          disabled={isDisabled}
                          className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                            isSelected
                              ? 'border-sky-500/50 bg-sky-500/10 text-sky-400'
                              : isDisabled
                                ? 'border-white/2 bg-white/1 text-white/20 cursor-not-allowed opacity-40'
                                : 'border-white/5 bg-white/3 text-white/60 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-sm">{dom}</span>
                            {isSelected && <CheckCircle size={16} className="text-sky-400 flex-shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* MCQ Section */}
                  <div className="pt-6 border-t border-white/5 space-y-8">
                    <div>
                      <h4 className="text-md font-bold text-white font-poppins mb-1">Domain & Situational Questions</h4>
                      <p className="text-xs text-white/40">Select the option that best matches your thought process for each situation.</p>
                    </div>

                    {mcqs.map((q) => (
                      <div key={q.id} className="space-y-4">
                        <div className="bg-white/2 border border-white/5 rounded-xl p-4">
                          <span className="block text-xs uppercase tracking-wider text-sky-400 font-bold mb-2">{q.title}</span>
                          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{q.question}</p>
                        </div>
                        <div className="grid gap-3">
                          {q.options.map((opt) => {
                            const isSelected = (form as any)[q.id] === opt.key;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => setForm({ ...form, [q.id]: opt.key })}
                                className={`p-4 rounded-xl text-left border transition-all duration-200 flex gap-4 items-start ${
                                  isSelected
                                    ? 'border-sky-500/50 bg-sky-500/10 text-white'
                                    : 'border-white/5 bg-white/3 text-white/60 hover:bg-white/5'
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs border ${
                                  isSelected ? 'bg-sky-500 border-sky-400 text-white' : 'border-white/20 text-white/40'
                                }`}>
                                  {opt.key}
                                </span>
                                <span className="text-sm leading-relaxed">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Short Answer Questions */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white font-poppins mb-2">
                      SECTION 6: SHORT ANSWER QUESTIONS
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-6">Explain your ideas, goals and motivations briefly.</p>
                  </div>

                  {shortAnswers.map((sa) => {
                    const value = (form as any)[sa.id];
                    const wordCount = getWordCount(value);
                    const isOverLimit = wordCount > sa.maxWords;
                    return (
                      <div key={sa.id} className="space-y-3">
                        <label className="block text-sm text-white/80 font-medium leading-relaxed">
                          {sa.label} *
                        </label>
                        <textarea
                          name={sa.id}
                          value={value}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          placeholder={sa.placeholder}
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:bg-sky-500/5 transition-all duration-300 text-sm resize-none ${
                            isOverLimit 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-sky-500/50'
                          }`}
                        />
                        <div className="flex justify-between items-center text-xs">
                          <span className={isOverLimit ? 'text-red-400 font-bold' : 'text-white/40'}>
                            {isOverLimit ? 'Word limit exceeded!' : 'Word Count:'}
                          </span>
                          <span className={isOverLimit ? 'text-red-400 font-bold' : 'text-white/60'}>
                            {wordCount} / {sa.maxWords} words
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-white/5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary w-full sm:w-auto flex justify-center items-center gap-2 py-3 px-6 text-sm"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`btn-primary w-full sm:w-auto flex justify-center items-center gap-2 py-3 px-6 text-sm ${
                      !isStepValid() ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !isStepValid()}
                    className={`btn-primary w-full sm:w-auto flex justify-center items-center gap-2 py-3.5 px-8 text-sm ${
                      loading || !isStepValid() ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application <CheckCircle size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
