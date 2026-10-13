"""Formal setup configuration: reads requirements.txt so the dependency
list lives in ONE place (Task 6.1)."""
from pathlib import Path
from setuptools import setup, find_packages


def read_requirements(path="requirements.txt"):
    lines = Path(path).read_text(encoding="utf-8").splitlines()
    return [ln.strip() for ln in lines if ln.strip() and not ln.startswith("#")]


setup(
    name="lab6-django-setup",
    version="1.0.0",
    description="Django environment setup for BTCS303P Lab 6",
    packages=find_packages(exclude=("venv",)),
    python_requires=">=3.10",
    install_requires=read_requirements(),
)
