from abc import ABC, abstractmethod
from typing import IO, Dict, Any

class SpeechProvider(ABC):
    @abstractmethod
    def transcribe(self, audio_file: IO, language_code: str = "en") -> str:
        """
        Convert audio to text in the specified language.
        """
        pass
        
    @abstractmethod
    def synthesize(self, text: str, language_code: str = "en") -> str:
        """
        Convert text to audio URL.
        """
        pass

class MockSpeechProvider(SpeechProvider):
    """
    Mock implementation for local development without API keys.
    In production, this would wrap Google Cloud Speech-to-Text or Whisper,
    supporting languages like Hindi ('hi-IN'), Marathi ('mr-IN'), Spanish ('es-ES').
    """
    
    def transcribe(self, audio_file: IO, language_code: str = "en") -> str:
        # Simulate processing time
        import time
        time.sleep(1)
        
        # Simulate transcription output based on language
        if language_code.startswith("hi"):
            return "मेरे टमाटर के पौधों में क्या समस्या है?" # "What is the problem with my tomato plants?"
        elif language_code.startswith("es"):
            return "¿Qué problemas tienen mis tomates?"
        else:
            return "What is the problem with my tomato plants?"
            
    def synthesize(self, text: str, language_code: str = "en") -> str:
        # Return a mock URL to a generated audio file
        return "/static/audio/response_mock.mp3"

def get_speech_provider() -> SpeechProvider:
    return MockSpeechProvider()
