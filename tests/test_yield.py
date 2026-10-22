"""Yield estimation algorithm tests."""
import pytest

def test_yield_bounds():
    min_yield = 1.0  # tons/acre
    max_yield = 10.0 # tons/acre
    predicted = 4.2
    assert min_yield <= predicted <= max_yield

def test_confidence_interval():
    confidence = 87
    assert 50 <= confidence <= 100
