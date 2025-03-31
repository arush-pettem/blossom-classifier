
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface TaxonomyLevel {
  name: string;
  description: string;
  color: string;
  score: number;
}

interface ResultsDisplayProps {
  results: TaxonomyLevel[] | null;
  inputText: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputText }) => {
  if (!results) return null;

  const topLevel = [...results].sort((a, b) => b.score - a.score)[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Classification Results</CardTitle>
          <CardDescription>
            Analysis of your input based on Bloom's Taxonomy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm italic">"{inputText}"</p>
          </div>
          
          <div className="space-y-1 mb-4">
            <p className="text-sm font-medium">Primary Classification:</p>
            <p className="text-lg font-bold" style={{ color: topLevel.color }}>
              {topLevel.name}
            </p>
            <p className="text-sm text-muted-foreground">{topLevel.description}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">Full Breakdown:</p>
            {results.map((level) => (
              <div
                key={level.name}
                className={cn("taxonomy-level", {
                  "highlighted": level.name === topLevel.name
                })}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium" style={{ color: level.color }}>
                    {level.name}
                  </h3>
                  <span className="text-sm font-medium">
                    {Math.round(level.score * 100)}%
                  </span>
                </div>
                <div className="taxonomy-meter">
                  <div 
                    className="taxonomy-meter-fill" 
                    style={{ 
                      width: `${Math.round(level.score * 100)}%`,
                      backgroundColor: level.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
