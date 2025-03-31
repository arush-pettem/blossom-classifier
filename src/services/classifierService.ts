
// This is a mock service that will be replaced with your actual backend model
// When integrating with your backend, replace the mockClassify function with 
// an actual API call to your model

import { TaxonomyLevel } from '@/components/ResultsDisplay';

const MOCK_DELAY = 1500; // Simulates network request time

const bloomLevels: Omit<TaxonomyLevel, 'score'>[] = [
  {
    name: "Remember",
    description: "Recall facts and basic concepts",
    color: "#4285F4"
  },
  {
    name: "Understand",
    description: "Explain ideas or concepts",
    color: "#34A853"
  },
  {
    name: "Apply",
    description: "Use information in new situations",
    color: "#FBBC05"
  },
  {
    name: "Analyze",
    description: "Connect ideas and determine relationships",
    color: "#EA4335"
  },
  {
    name: "Evaluate",
    description: "Justify a decision or position",
    color: "#9C27B0"
  },
  {
    name: "Create",
    description: "Produce new or original work",
    color: "#FF5722"
  }
];

// Simple mock classification based on keywords
// This should be replaced with your actual model
const mockClassify = (text: string): Promise<TaxonomyLevel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      // Very simple keyword matching - replace with your model
      const scores = {
        "Remember": getKeywordScore(lowerText, ["define", "list", "memorize", "identify", "recall", "name", "what", "when", "where", "who"]),
        "Understand": getKeywordScore(lowerText, ["explain", "describe", "clarify", "discuss", "interpret", "recognize", "summarize", "why", "how"]),
        "Apply": getKeywordScore(lowerText, ["apply", "demonstrate", "solve", "use", "illustrate", "show", "implement"]),
        "Analyze": getKeywordScore(lowerText, ["analyze", "compare", "contrast", "distinguish", "examine", "investigate", "categorize", "differentiate"]),
        "Evaluate": getKeywordScore(lowerText, ["evaluate", "judge", "critique", "defend", "justify", "argue", "recommend", "assess", "value"]),
        "Create": getKeywordScore(lowerText, ["create", "design", "develop", "compose", "construct", "formulate", "author", "invent", "devise"])
      };
      
      // Add some randomness to make it more realistic
      const result = bloomLevels.map(level => ({
        ...level,
        score: Math.min(0.95, Math.max(0.05, scores[level.name as keyof typeof scores] + Math.random() * 0.2))
      }));
      
      // Normalize scores to ensure they add up to 1
      const total = result.reduce((sum, level) => sum + level.score, 0);
      const normalized = result.map(level => ({
        ...level,
        score: level.score / total
      }));
      
      resolve(normalized);
    }, MOCK_DELAY);
  });
};

function getKeywordScore(text: string, keywords: string[]): number {
  let score = 0;
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 0.15;
    }
  });
  return Math.min(0.9, score);
}

export const classifyText = async (text: string): Promise<TaxonomyLevel[]> => {
  // Replace this with your actual API call to your backend model
  return mockClassify(text);
};
