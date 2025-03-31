
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BloomExplanation: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Bloom's Taxonomy</CardTitle>
        <CardDescription>
          A framework for categorizing educational goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <p>
            Bloom's Taxonomy is a hierarchical model used to classify educational learning objectives
            into levels of complexity and specificity. It was created by Benjamin Bloom in 1956 and later
            revised in 2001.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#4285F4]">Remember</h4>
              <p className="text-muted-foreground text-xs">
                Recall facts and basic concepts. Keywords: define, list, memorize, repeat, state.
              </p>
            </div>
            
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#34A853]">Understand</h4>
              <p className="text-muted-foreground text-xs">
                Explain ideas or concepts. Keywords: classify, describe, discuss, explain, identify.
              </p>
            </div>
            
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#FBBC05]">Apply</h4>
              <p className="text-muted-foreground text-xs">
                Use information in new situations. Keywords: execute, implement, solve, use, demonstrate.
              </p>
            </div>
            
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#EA4335]">Analyze</h4>
              <p className="text-muted-foreground text-xs">
                Connect ideas and determine relationships. Keywords: differentiate, organize, relate, compare, examine.
              </p>
            </div>
            
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#9C27B0]">Evaluate</h4>
              <p className="text-muted-foreground text-xs">
                Justify a decision or position. Keywords: appraise, critique, judge, defend, support.
              </p>
            </div>
            
            <div className="p-3 rounded-md border">
              <h4 className="font-semibold text-[#FF5722]">Create</h4>
              <p className="text-muted-foreground text-xs">
                Produce new or original work. Keywords: design, assemble, develop, formulate, author.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloomExplanation;
