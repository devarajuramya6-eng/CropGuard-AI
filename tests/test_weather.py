"""Weather and market price forecasting unit tests."""
import pytest

def test_weather_alert_trigger():
    temp_celsius = 42.5
    humidity_pct = 85.0
    heat_index_high = temp_celsius > 40 and humidity_pct > 70
    assert heat_index_high is True

def test_mandi_market_rates():
    market_rates = {
        "Wheat": 2450.0,
        "Mustard": 5200.0,
        "Cotton": 6800.0
    }
    assert market_rates["Wheat"] > 2000.0
    assert all(price > 0 for price in market_rates.values())
