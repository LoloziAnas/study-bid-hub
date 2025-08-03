export interface HelpRequest {
  id: string;
  title: string;
  subject: string;
  description: string;
  deliveryTypes: string[];
  deadline: Date;
  budget?: number;
  bidCount: number;
  status: "open" | "in_progress" | "completed";
  createdAt: Date;
  studentName?: string;
}

export interface Bid {
  id: string;
  requestId: string;
  helperName: string;
  helperRating: number;
  price: number;
  deliveryTime: string;
  message: string;
  createdAt: Date;
}

export const mockRequests: HelpRequest[] = [
  {
    id: "1",
    title: "Help with Calculus Integration Problems",
    subject: "Mathematics",
    description: "I need help understanding integration by parts and substitution methods. Specifically struggling with problems involving trigonometric functions.",
    deliveryTypes: ["Text", "Audio"],
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    budget: 25,
    bidCount: 5,
    status: "open",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    studentName: "Sarah Johnson"
  },
  {
    id: "2",
    title: "Python Data Structures Assignment",
    subject: "Computer Science",
    description: "Need assistance with implementing binary trees and graph algorithms in Python. Assignment due in 3 days.",
    deliveryTypes: ["Screen", "Text"],
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    budget: 40,
    bidCount: 8,
    status: "open",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    studentName: "Michael Chen"
  },
  {
    id: "3",
    title: "Chemistry Lab Report Review",
    subject: "Chemistry",
    description: "Looking for someone to review my organic chemistry lab report and help with analysis section.",
    deliveryTypes: ["Text"],
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    budget: 15,
    bidCount: 3,
    status: "in_progress",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    studentName: "Emma Wilson"
  },
  {
    id: "4",
    title: "Physics Quantum Mechanics Concepts",
    subject: "Physics",
    description: "Need explanation of wave-particle duality and uncertainty principle with practical examples.",
    deliveryTypes: ["Audio", "Text"],
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    budget: 30,
    bidCount: 6,
    status: "open",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    studentName: "David Rodriguez"
  },
  {
    id: "5",
    title: "English Essay Proofreading",
    subject: "English",
    description: "Need someone to proofread my argumentative essay on climate change and provide feedback on structure.",
    deliveryTypes: ["Text"],
    deadline: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
    budget: 20,
    bidCount: 12,
    status: "completed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    studentName: "Ashley Thompson"
  },
  {
    id: "6",
    title: "Biology Cell Division Process",
    subject: "Biology",
    description: "Help understanding mitosis and meiosis differences with diagrams and explanations.",
    deliveryTypes: ["Screen", "Audio"],
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    bidCount: 4,
    status: "open",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    studentName: "Jordan Lee"
  }
];

export const mockBids: Bid[] = [
  {
    id: "1",
    requestId: "1",
    helperName: "Alex Mathematics",
    helperRating: 4.8,
    price: 20,
    deliveryTime: "Within 24 hours",
    message: "I'm a graduate student in applied mathematics with 3+ years of tutoring experience. I specialize in calculus and can provide clear explanations with step-by-step solutions.",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "2",
    requestId: "1",
    helperName: "Maria Calculus Expert",
    helperRating: 4.9,
    price: 25,
    deliveryTime: "Within 12 hours",
    message: "PhD in Mathematics with extensive experience in calculus tutoring. I can provide both written explanations and audio recordings explaining each step clearly.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: "3",
    requestId: "2",
    helperName: "CodeMaster Pro",
    helperRating: 4.7,
    price: 35,
    deliveryTime: "Within 48 hours",
    message: "Senior software engineer with expertise in Python and data structures. I can provide live coding sessions and detailed explanations.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: "4",
    requestId: "4",
    helperName: "Dr. Physics",
    helperRating: 5.0,
    price: 28,
    deliveryTime: "Within 36 hours",
    message: "Physics professor with specialization in quantum mechanics. I can explain complex concepts in simple terms with real-world analogies.",
    createdAt: new Date(Date.now() - 45 * 60 * 1000)
  }
];

export const getUserRequests = (userId?: string) => {
  // For demo purposes, return a subset of requests
  return mockRequests.slice(0, 3);
};

export const getRequestById = (id: string) => {
  return mockRequests.find(request => request.id === id);
};

export const getBidsForRequest = (requestId: string) => {
  return mockBids.filter(bid => bid.requestId === requestId);
};