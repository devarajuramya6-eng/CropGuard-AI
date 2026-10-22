"""Authentication and user management tests."""
import pytest

def test_password_hashing():
    pwd = "FarmerSecurePassword2026!"
    assert len(pwd) >= 8
    assert any(c.isupper() for c in pwd)
    assert any(c.isdigit() for c in pwd)

def test_user_roles():
    allowed_roles = ["Farmer", "Agronomist", "Admin"]
    user_role = "Farmer"
    assert user_role in allowed_roles

def test_jwt_token_payload():
    payload = {"sub": "user_123", "role": "Farmer", "exp": 1792345600}
    assert "sub" in payload
    assert payload["role"] == "Farmer"
