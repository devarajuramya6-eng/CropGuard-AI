.PHONY: install build run test lint clean

install:
	pip install -r services/api/requirements.txt
	cd apps/web && npm install

build:
	cd apps/web && npm run build

run:
	python main.py

test:
	pytest tests/ --cov=. --cov-report=xml --cov-report=term

lint:
	cd apps/web && npm run lint

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
