
# Bloom's Taxonomy Classifier Backend

This is a Flask API that serves the machine learning model for classifying text according to Bloom's Taxonomy.

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

3. Run the server:
   ```
   python app.py
   ```

   The API will be available at http://localhost:5000

## Integration

This Flask API serves as the backend for the Bloom's Taxonomy Classifier web application. The main endpoint is:

- POST `/api/classify` - Takes a JSON object with a `text` field and returns the classification results

## Deploying

To deploy this application:

1. Make sure your model is properly integrated in the app.py file
2. Deploy to a platform like Heroku, AWS, or Google Cloud

Remember to set the appropriate environment variables on your deployment platform.
