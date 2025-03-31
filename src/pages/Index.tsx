
import React, { useState } from 'react';
import Header from '@/components/Header';
import TextInput from '@/components/TextInput';
import ResultsDisplay, { TaxonomyLevel } from '@/components/ResultsDisplay';
import BloomExplanation from '@/components/BloomExplanation';
import { classifyText } from '@/services/classifierService';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<TaxonomyLevel[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    setInputText(text);
    setIsLoading(true);
    
    try {
      const classificationResults = await classifyText(text);
      setResults(classificationResults);
    } catch (error) {
      console.error('Error classifying text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bloom's Taxonomy Classifier</h2>
            <p className="text-muted-foreground">
              Enter text to classify it according to Bloom's Taxonomy cognitive levels.
              This tool helps educators analyze questions, prompts, and assignments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <TextInput onSubmit={handleSubmit} isLoading={isLoading} />
              
              <div className="hidden md:block">
                <BloomExplanation />
              </div>
            </div>
            
            <div>
              {results ? (
                <ResultsDisplay results={results} inputText={inputText} />
              ) : (
                <div className="h-full flex items-center justify-center p-12 bg-muted/30 rounded-lg border border-dashed text-center">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">No classification yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter text in the input field and click "Classify Text" to see results.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden mt-8">
            <Separator className="my-6" />
            <BloomExplanation />
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 border-t bg-white">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Bloom's Taxonomy Classifier © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
