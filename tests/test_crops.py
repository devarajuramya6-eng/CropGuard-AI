"""Crop disease and leaf health diagnosis tests."""
import pytest

def test_crop_varieties():
    varieties = ["Durum Wheat", "Roma Tomato", "Basmati Rice", "Russet Potato"]
    assert len(varieties) == 4
    assert "Roma Tomato" in varieties

def test_disease_severity_calculation():
    def calculate_severity(affected_area_pct):
        if affected_area_pct < 10:
            return "Mild"
        elif affected_area_pct < 30:
            return "Moderate"
        return "Severe"

    assert calculate_severity(5) == "Mild"
    assert calculate_severity(15) == "Moderate"
    assert calculate_severity(50) == "Severe"

def test_pesticide_recommendation():
    recommendations = {
        "Early Blight": "Mancozeb 75% WP",
        "Leaf Rust": "Propiconazole 25% EC",
        "Powdery Mildew": "Sulfur 80% WDG"
    }
    assert recommendations["Early Blight"] == "Mancozeb 75% WP"
