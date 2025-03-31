
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim().length < 5) {
      toast({
        title: "Text too short",
        description: "Please enter at least 5 characters for accurate classification.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="text-input" className="block text-sm font-medium text-foreground">
          Enter text to classify
        </label>
        <Textarea
          id="text-input"
          placeholder="Enter a sentence, question, or assignment prompt..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || text.trim().length === 0}
      >
        {isLoading ? "Classifying..." : "Classify Text"}
      </Button>
    </form>
  );
};

export default TextInput;
