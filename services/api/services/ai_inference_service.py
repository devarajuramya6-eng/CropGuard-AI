import random

class AIInferenceService:
    """
    Handles the core disease detection logic.
    In a real environment, this loads a PyTorch/TensorFlow model or calls a dedicated
    ML microservice (e.g., via gRPC) to classify the crop leaf disease.
    """
    
    def predict(self, file_path: str, crop_type: str = "Tomato") -> dict:
        """
        Simulates ML inference returning classification, confidence, and severity.
        """
        
        # Simulated possible outcomes based on crop
        outcomes = [
            {"disease": "Healthy", "severity": "Healthy"},
            {"disease": "Early Blight", "severity": "Moderate"},
            {"disease": "Late Blight", "severity": "Severe"},
            {"disease": "Septoria Leaf Spot", "severity": "Early"}
        ]
        
        prediction = random.choice(outcomes)
        confidence = random.uniform(0.40, 0.98) # Random confidence between 40% and 98%
        
        needs_expert = False
        explanation = "Model prediction is within acceptable parameters."
        
        if confidence < 0.65:
            needs_expert = True
            explanation = "AI confidence is low. Visual indicators are ambiguous. Consider requesting expert review."
            
        return {
            "predicted_disease": prediction["disease"],
            "confidence_score": round(confidence, 2),
            "severity": prediction["severity"],
            "needs_expert_review": needs_expert,
            "explanation": explanation,
            "limitations": "Predictions are estimates and not agricultural guarantees."
        }

inference_service = AIInferenceService()
