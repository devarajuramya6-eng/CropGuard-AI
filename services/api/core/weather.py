from abc import ABC, abstractmethod
from typing import Dict, Any
import random

class WeatherProvider(ABC):
    @abstractmethod
    def get_current_weather(self, location: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_forecast(self, location: str, days: int = 3) -> Dict[str, Any]:
        pass

class MockWeatherProvider(WeatherProvider):
    """
    Mock implementation of a Weather Provider.
    Fulfills the requirement to not strictly depend on commercial API keys 
    during local development or CI environments.
    """
    def get_current_weather(self, location: str) -> Dict[str, Any]:
        return {
            "location": location,
            "temperature_c": round(random.uniform(15.0, 35.0), 1),
            "humidity_percent": random.randint(40, 95),
            "rainfall_mm": round(random.uniform(0.0, 50.0), 1),
            "wind_kph": round(random.uniform(0.0, 25.0), 1),
            "condition": random.choice(["Sunny", "Cloudy", "Rain", "Humid"])
        }

    def get_forecast(self, location: str, days: int = 3) -> Dict[str, Any]:
        forecast = []
        for d in range(days):
            forecast.append({
                "day_offset": d + 1,
                "temp_max": round(random.uniform(25.0, 38.0), 1),
                "temp_min": round(random.uniform(15.0, 24.0), 1),
                "rainfall_probability": random.randint(0, 100)
            })
        return {
            "location": location,
            "forecast": forecast
        }

# Dependency Injection function
def get_weather_provider() -> WeatherProvider:
    return MockWeatherProvider()
