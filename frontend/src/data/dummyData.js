export const studentProfile = {
  name: 'Aarav Sharma',
  education: 'B.Tech',
  branch: 'Computer Science & Engineering',
  currentSkills: [
    { name: 'JavaScript', level: 75 },
    { name: 'React.js', level: 65 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'Python', level: 55 },
    { name: 'Node.js', level: 45 },
    { name: 'SQL', level: 50 },
  ],
  interests: ['Web Development', 'Cloud Computing', 'Machine Learning', 'Open Source'],
  targetRole: 'Full Stack Developer',
};

export const careerMatch = {
  score: 72,
  targetRole: 'Full Stack Developer',
  strengths: [
    { title: 'Frontend Development', description: 'Strong foundation in React, HTML, and CSS with 3+ project experience' },
    { title: 'Problem Solving', description: 'Excellent analytical skills demonstrated in coding challenges' },
    { title: 'Learning Agility', description: 'Quick to adapt to new technologies and frameworks' },
  ],
  skillGaps: [
    { name: 'AWS Cloud Services', importance: 'High', description: 'Experience with EC2, S3, Lambda required' },
    { name: 'TypeScript', importance: 'High', description: 'Type-safe JavaScript increasingly required' },
    { name: 'Docker & CI/CD', importance: 'Medium', description: 'Containerization and deployment pipelines' },
    { name: 'GraphQL', importance: 'Medium', description: 'Modern API query language' },
    { name: 'System Design', importance: 'Medium', description: 'Architecture patterns and scalability' },
  ],
  recommendedSkills: [
    { name: 'AWS Certified Developer', progress: 0, priority: 'High' },
    { name: 'TypeScript Fundamentals', progress: 15, priority: 'High' },
    { name: 'Docker Essentials', progress: 0, priority: 'Medium' },
    { name: 'Next.js Framework', progress: 25, priority: 'Medium' },
    { name: 'GraphQL with Apollo', progress: 0, priority: 'Medium' },
    { name: 'System Design Basics', progress: 10, priority: 'Low' },
  ],
};

export const learningRoadmap = [
  {
    week: 1,
    title: 'Foundation & Cloud Essentials',
    focus: 'AWS Basics & TypeScript',
    tasks: [
      { id: 1, title: 'AWS Cloud Practitioner Essentials', completed: true, duration: '6 hrs' },
      { id: 2, title: 'TypeScript: Complete Developer Guide', completed: true, duration: '8 hrs' },
      { id: 3, title: 'Build a TS + React Todo App', completed: false, duration: '4 hrs' },
      { id: 4, title: 'Intro to IAM, S3, and EC2', completed: false, duration: '5 hrs' },
    ],
    resources: ['AWS Skill Builder', 'Udemy: Stephen Grider', 'freeCodeCamp'],
  },
  {
    week: 2,
    title: 'Containerization & Backend',
    focus: 'Docker & Node.js',
    tasks: [
      { id: 1, title: 'Docker for Beginners', completed: false, duration: '5 hrs' },
      { id: 2, title: 'REST APIs with Node + Express', completed: false, duration: '7 hrs' },
      { id: 3, title: 'Containerize a MERN App', completed: false, duration: '6 hrs' },
      { id: 4, title: 'Intro to AWS Lambda', completed: false, duration: '4 hrs' },
    ],
    resources: ['Docker Docs', 'AWS Docs', 'YouTube: TechWorld with Nana'],
  },
  {
    week: 3,
    title: 'Modern Web & GraphQL',
    focus: 'Next.js & GraphQL',
    tasks: [
      { id: 1, title: 'Next.js 14 Fundamentals', completed: false, duration: '8 hrs' },
      { id: 2, title: 'GraphQL Crash Course', completed: false, duration: '5 hrs' },
      { id: 3, title: 'Build a Blog with Next + Prisma', completed: false, duration: '10 hrs' },
      { id: 4, title: 'Deploy to Vercel + AWS Amplify', completed: false, duration: '3 hrs' },
    ],
    resources: ['Next.js Docs', 'Apollo GraphQL Tutorials', 'Prisma Docs'],
  },
  {
    week: 4,
    title: 'System Design & Interviews',
    focus: 'Architecture & Prep',
    tasks: [
      { id: 1, title: 'System Design for Developers', completed: false, duration: '8 hrs' },
      { id: 2, title: 'Mock Interviews (5 Sessions)', completed: false, duration: '10 hrs' },
      { id: 3, title: 'Build Portfolio Project', completed: false, duration: '12 hrs' },
      { id: 4, title: 'Resume & LinkedIn Optimization', completed: false, duration: '3 hrs' },
    ],
    resources: ['Educative.io', 'Interviewing.io', 'Levels.fyi'],
  },
];

export const interviewQuestions = [
  {
    id: 1,
    category: 'Technical',
    question: 'Explain the difference between REST and GraphQL APIs. When would you choose one over the other?',
    difficulty: 'Medium',
  },
  {
    id: 2,
    category: 'AWS / Cloud',
    question: 'Describe the key differences between S3, EBS, and EFS storage services in AWS.',
    difficulty: 'Medium',
  },
  {
    id: 3,
    category: 'React',
    question: 'How do you optimize a React application for performance? Mention at least 5 techniques.',
    difficulty: 'Medium',
  },
  {
    id: 4,
    category: 'System Design',
    question: 'Design a URL shortening service like bit.ly. Consider scalability and database choices.',
    difficulty: 'Hard',
  },
  {
    id: 5,
    category: 'Behavioral',
    question: 'Tell me about a project where you had to learn a new technology quickly. What was your approach?',
    difficulty: 'Easy',
  },
  {
    id: 6,
    category: 'Technical',
    question: 'What is the event loop in JavaScript? Explain how call stack, task queue, and microtasks work together.',
    difficulty: 'Hard',
  },
];

export const progressStats = [
  { label: 'Skills Mastered', value: 3, total: 12, icon: 'check-circle' },
  { label: 'Roadmap Progress', value: 25, total: 100, icon: 'trending-up' },
  { label: 'Questions Practiced', value: 12, total: 50, icon: 'message-square' },
  { label: 'Hours Invested', value: 18, total: 120, icon: 'clock' },
];
