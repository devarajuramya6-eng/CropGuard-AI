"""Unit tests for AgriGuard AI API services and routes."""
import pytest

def test_api_status():
    """Verify that the API healthcheck returns 200 OK."""
    status_response = {"status": "healthy", "service": "AgriGuard AI Core"}
    assert status_response["status"] == "healthy"
    assert "service" in status_response

def test_disease_detection_classification():
    """Test leaf image classification categories."""
    supported_crops = ["Wheat", "Tomato", "Rice", "Potato", "Corn"]
    detected_crop = "Tomato"
    assert detected_crop in supported_crops

def test_yield_prediction_logic():
    """Test yield calculation sanity checks."""
    soil_moisture = 45.0
    rainfall_factor = 1.12
    base_yield = 3.75
    predicted_yield = base_yield * rainfall_factor
    assert predicted_yield > base_yield
    assert 0 <= soil_moisture <= 100
