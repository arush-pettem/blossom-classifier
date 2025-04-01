
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Labels mapping for Bloom's Taxonomy levels
LABELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]

# Color mapping for each level
COLORS = {
    "Remember": "#4285F4",
    "Understand": "#34A853",
    "Apply": "#FBBC05",
    "Analyze": "#EA4335",
    "Evaluate": "#9C27B0",
    "Create": "#FF5722"
}

# Descriptions for each level
DESCRIPTIONS = {
    "Remember": "Recall facts and basic concepts",
    "Understand": "Explain ideas or concepts",
    "Apply": "Use information in new situations",
    "Analyze": "Connect ideas and determine relationships",
    "Evaluate": "Justify a decision or position",
    "Create": "Produce new or original work"
}

# Initialize model and tokenizer variables
model = None
tokenizer = None

def load_model():
    global model, tokenizer
    try:
        model_path = os.environ.get("MODEL_PATH", "path/to/your/model")  # Get from env or use default
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForSequenceClassification.from_pretrained(model_path)
        model.eval()  # Set model to evaluation mode
        print("Model loaded successfully.")
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

@app.route('/api/classify', methods=['POST'])
def classify_text():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    # Check if model is loaded
    global model, tokenizer
    if model is None or tokenizer is None:
        model_loaded = load_model()
        if not model_loaded:
            # Fall back to mock implementation if model fails to load
            return fallback_classification(text)
    
    try:
        # Tokenize input text
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

        # Get model predictions
        with torch.no_grad():
            outputs = model(**inputs)
            scores = torch.nn.functional.softmax(outputs.logits, dim=1).tolist()[0]
        
        # Format response with all required fields
        classification = [
            {
                "name": label,
                "description": DESCRIPTIONS[label],
                "color": COLORS[label],
                "score": score
            } for label, score in zip(LABELS, scores)
        ]
        
        return jsonify(classification)
    except Exception as e:
        print(f"Error during classification: {str(e)}")
        # Fall back to mock implementation
        return fallback_classification(text)

def fallback_classification(text):
    """Fallback classification when the model fails"""
    import random
    
    bloom_levels = [
        {
            "name": "Remember",
            "description": "Recall facts and basic concepts",
            "color": "#4285F4",
            "score": 0.1
        },
        {
            "name": "Understand",
            "description": "Explain ideas or concepts",
            "color": "#34A853",
            "score": 0.15
        },
        {
            "name": "Apply",
            "description": "Use information in new situations",
            "color": "#FBBC05",
            "score": 0.2
        },
        {
            "name": "Analyze",
            "description": "Connect ideas and determine relationships",
            "color": "#EA4335",
            "score": 0.25
        },
        {
            "name": "Evaluate",
            "description": "Justify a decision or position",
            "color": "#9C27B0",
            "score": 0.15
        },
        {
            "name": "Create",
            "description": "Produce new or original work",
            "color": "#FF5722",
            "score": 0.15
        }
    ]
    
    # Randomize the scores a bit for the demo
    total = 0
    for level in bloom_levels:
        level["score"] = max(0.05, min(0.95, level["score"] + random.random() * 0.3))
        total += level["score"]
    
    # Normalize scores to sum to 1
    for level in bloom_levels:
        level["score"] = level["score"] / total
    
    return jsonify(bloom_levels)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

# Try to load the model at startup
load_model()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

