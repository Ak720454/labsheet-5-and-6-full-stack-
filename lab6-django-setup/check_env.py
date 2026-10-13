#!/usr/bin/env python3
"""Lab 6.3 - Automated deployment check.

Validates: Python runtime, virtual environment, pip, PATH entries,
requirements.txt packages, Django, and required environment keys.
Exit code: 0 = all good (warnings allowed), 1 = at least one FAIL.

Usage:  python check_env.py [--env-file .env] [--requirements requirements.txt]
"""
import argparse
import importlib.metadata as md
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

MIN_PYTHON = (3, 10)
REQUIRED_KEYS = [
    "DJANGO_SETTINGS_MODULE",
    "DJANGO_SECRET_KEY",
    "DJANGO_DEBUG",
    "DJANGO_ALLOWED_HOSTS",
]
RESULTS = []


def record(status, name, detail=""):
    RESULTS.append(status)
    print(f"[{status:<4}] {name}" + (f" - {detail}" if detail else ""))


def load_env_file(path):
    """Tiny .env loader (KEY=VALUE per line). Real env vars win."""
    p = Path(path)
    if not p.is_file():
        return False
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip("\"'"))
    return True


def check_python():
    ver = sys.version_info[:3]
    text = ".".join(map(str, ver))
    if ver >= MIN_PYTHON:
        record("PASS", "Python version", f"{text} at {sys.executable}")
    else:
        record("FAIL", "Python version",
               f"{text}; need {MIN_PYTHON[0]}.{MIN_PYTHON[1]}+")


def check_venv():
    if sys.prefix != sys.base_prefix:
        record("PASS", "Virtual environment active", sys.prefix)
    else:
        record("FAIL", "Virtual environment active",
               "not inside a venv; run venv\\Scripts\\activate first")


def check_pip():
    try:
        out = subprocess.run([sys.executable, "-m", "pip", "--version"],
                             capture_output=True, text=True, check=True)
        record("PASS", "pip available", out.stdout.split(" from ")[0].strip())
    except (subprocess.CalledProcessError, OSError):
        record("FAIL", "pip available", "pip not working for this Python")


def check_requirements(req_file):
    p = Path(req_file)
    if not p.is_file():
        record("FAIL", "requirements file", f"{req_file} not found")
        return
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith(("#", "-")):
            continue
        match = re.match(r"[A-Za-z0-9_.\-]+", line)
        if not match:
            continue
        name = match.group(0)
        try:
            record("PASS", f"Package {name}", md.version(name))
        except md.PackageNotFoundError:
            record("FAIL", f"Package {name}", "not installed")


def check_django():
    try:
        import django
        record("PASS", "Django import", django.get_version())
    except ImportError:
        record("FAIL", "Django import", "run: pip install -r requirements.txt")
        return
    if shutil.which("django-admin"):
        record("PASS", "django-admin on PATH", shutil.which("django-admin"))
    else:
        record("WARN", "django-admin on PATH", "not found (venv not active?)")


def check_env_keys():
    for key in REQUIRED_KEYS:
        value = os.environ.get(key)
        if not value:
            record("FAIL", f"Env key {key}", "missing")
            continue
        if key == "DJANGO_SECRET_KEY":
            if len(value) < 32 or value.startswith("change-me"):
                record("WARN", f"Env key {key}", "set but weak/default value")
            else:
                record("PASS", f"Env key {key}", "set (value hidden)")
        elif key == "DJANGO_DEBUG" and value.lower() in ("1", "true", "yes"):
            record("WARN", f"Env key {key}", "DEBUG is ON; turn off in production")
        else:
            record("PASS", f"Env key {key}", value)


def check_path():
    dirs = [d for d in os.environ.get("PATH", "").split(os.pathsep) if d]
    missing = [d for d in dirs if not Path(d).is_dir()]
    if missing:
        record("WARN", "PATH entries", f"{len(missing)} of {len(dirs)} do not exist")
    else:
        record("PASS", "PATH entries", f"all {len(dirs)} exist")


def check_project():
    if not Path("manage.py").is_file():
        record("WARN", "Django project", "manage.py not found (run setup_env first)")
        return
    out = subprocess.run([sys.executable, "manage.py", "check"],
                         capture_output=True, text=True)
    if out.returncode == 0:
        record("PASS", "manage.py check", "no issues")
    else:
        record("FAIL", "manage.py check", (out.stderr or out.stdout).strip()[:200])


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--env-file", default=".env")
    parser.add_argument("--requirements", default="requirements.txt")
    args = parser.parse_args()

    print("=== Deployment environment check ===")
    if load_env_file(args.env_file):
        print(f"(loaded {args.env_file})")
    check_python()
    check_venv()
    check_pip()
    check_path()
    check_requirements(args.requirements)
    check_django()
    check_env_keys()
    check_project()

    fails, warns = RESULTS.count("FAIL"), RESULTS.count("WARN")
    print(f"\nSummary: {RESULTS.count('PASS')} passed, {warns} warnings, {fails} failed")
    print("RESULT:", "READY" if fails == 0 else "NOT READY")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
