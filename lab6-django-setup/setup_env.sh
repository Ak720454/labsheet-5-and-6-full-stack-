#!/usr/bin/env bash
# ===== Lab 6.1 - Django virtual environment setup (Linux/macOS/Git Bash) =====
set -euo pipefail
VENV_DIR=venv
PROJECT=mysite

command -v python3 >/dev/null || { echo "[FAIL] python3 not found"; exit 1; }
python3 --version

[ -d "$VENV_DIR" ] || python3 -m venv "$VENV_DIR"
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate" 2>/dev/null || source "$VENV_DIR/Scripts/activate"

python -m pip install --upgrade pip
pip install -r requirements.txt

# Pipe installed packages into a lock file
pip freeze > requirements.lock.txt
echo "Saved exact versions to requirements.lock.txt"

[ -f manage.py ] || django-admin startproject "$PROJECT" .
[ -f .env ] || cp .env.example .env

echo
echo "Setup complete. Next: source $VENV_DIR/bin/activate && python check_env.py"
