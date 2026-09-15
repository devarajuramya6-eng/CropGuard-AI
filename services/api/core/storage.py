import os
import shutil
import uuid
from typing import IO
from abc import ABC, abstractmethod

class StorageProvider(ABC):
    @abstractmethod
    def save_file(self, file_obj: IO, filename: str) -> str:
        pass
        
    @abstractmethod
    def get_file_url(self, file_path: str) -> str:
        pass

class LocalStorageProvider(StorageProvider):
    """
    Saves uploaded files to the local file system.
    This fulfills the requirement to operate locally without external API keys.
    """
    def __init__(self, base_dir: str = "uploads"):
        self.base_dir = base_dir
        os.makedirs(self.base_dir, exist_ok=True)
        
    def save_file(self, file_obj: IO, filename: str) -> str:
        ext = filename.split(".")[-1]
        unique_name = f"{uuid.uuid4().hex}.{ext}"
        file_path = os.path.join(self.base_dir, unique_name)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file_obj, buffer)
            
        return file_path
        
    def get_file_url(self, file_path: str) -> str:
        # For local dev, this might route through a static files endpoint
        return f"/static/{os.path.basename(file_path)}"

# Dependency injection ready
def get_storage_provider() -> StorageProvider:
    return LocalStorageProvider()
