import random
import os

class ImageQualityService:
    """
    Evaluates images before they are sent to the heavy AI disease models.
    Checks for blur, lighting, and resolution.
    """
    
    def analyze_quality(self, file_path: str) -> dict:
        """
        In a production environment, this would use cv2 (OpenCV) to calculate
        the variance of the Laplacian for blur detection and average pixel 
        intensity for brightness.
        
        For architecture demonstration, we simulate the logic.
        """
        if not os.path.exists(file_path):
            return {
                "is_acceptable": False,
                "rejection_reason": "File corrupted or missing."
            }
            
        # Simulated OpenCV metrics
        blur_score = random.uniform(50.0, 500.0)
        brightness_score = random.uniform(30.0, 220.0)
        
        is_acceptable = True
        reason = None
        
        # Thresholds
        if blur_score < 100.0:
            is_acceptable = False
            reason = "Image is too blurry. Please upload a clear image of the affected leaf."
        elif brightness_score < 50.0:
            is_acceptable = False
            reason = "Image is too dark. Please ensure good lighting."
        elif brightness_score > 200.0:
            is_acceptable = False
            reason = "Image is overexposed (too bright)."
            
        return {
            "is_acceptable": is_acceptable,
            "blur_score": round(blur_score, 2),
            "brightness_score": round(brightness_score, 2),
            "resolution_ok": True,
            "rejection_reason": reason
        }

quality_service = ImageQualityService()
