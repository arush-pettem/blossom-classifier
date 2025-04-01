
# Bloom's Taxonomy Classifier Backend

This is a Flask API that serves a machine learning model for classifying text according to Bloom's Taxonomy levels.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set the model path:
   ```
   export MODEL_PATH="path/to/your/model"  # Replace with the actual path to your model
   ```

4. Run the server:
   ```
   python app.py
   ```

   The API will be available at http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check endpoint to verify the service is running
- `POST /api/classify` - Takes a JSON object with a `text` field and returns the classification results

## Model Information

This backend uses a Hugging Face transformer model for classification. Make sure to set the correct `MODEL_PATH` environment variable pointing to your pre-trained model.

If the model fails to load or encounters an error during classification, the API will fall back to a mock implementation.

## Deploying

To deploy this application:

1. Make sure your model is properly saved and accessible by the application
2. Deploy to a platform like Heroku, AWS, or Google Cloud
3. Set the `MODEL_PATH` environment variable on your deployment platform

