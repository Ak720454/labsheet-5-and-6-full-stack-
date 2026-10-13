@echo off
REM Runs the deployment check using the project's venv if it exists
if exist venv\Scripts\python.exe (
  venv\Scripts\python.exe check_env.py %*
) else (
  python check_env.py %*
)
