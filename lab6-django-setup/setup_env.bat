@echo off
REM ===== Lab 6.1 - Django virtual environment setup (Windows) =====
setlocal
set VENV_DIR=venv
set PROJECT=mysite

where python >nul 2>&1
if errorlevel 1 (
  echo [FAIL] Python not found. Install from python.org and tick "Add python.exe to PATH".
  exit /b 1
)
python --version

if not exist %VENV_DIR%\Scripts\activate.bat (
  echo Creating virtual environment...
  python -m venv %VENV_DIR%
)
call %VENV_DIR%\Scripts\activate.bat

python -m pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 exit /b 1

REM Pipe installed packages into a lock file
pip freeze > requirements.lock.txt
echo Saved exact versions to requirements.lock.txt

if not exist manage.py (
  django-admin startproject %PROJECT% .
)

if not exist .env copy .env.example .env >nul

echo.
echo Setup complete. Next:
echo   %VENV_DIR%\Scripts\activate
echo   python check_env.py
echo   python manage.py runserver
endlocal
