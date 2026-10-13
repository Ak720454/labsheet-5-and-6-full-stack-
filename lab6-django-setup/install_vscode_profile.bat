@echo off
REM ===== Lab 6.2 - install the VS Code profile files =====
REM Workspace files (settings, tasks, extensions, snippets) -> .\.vscode
REM User files (keybindings, snippets)                      -> %APPDATA%\Code\User
REM Existing user files are backed up once as *.bak before being replaced.
setlocal
set SRC=%~dp0vscode
set WS=%~dp0.vscode
set USERDIR=%APPDATA%\Code\User

if not exist "%WS%" mkdir "%WS%"
copy /Y "%SRC%\settings.json"     "%WS%\settings.json"     >nul
copy /Y "%SRC%\tasks.json"        "%WS%\tasks.json"        >nul
copy /Y "%SRC%\extensions.json"   "%WS%\extensions.json"   >nul
copy /Y "%SRC%\python.code-snippets" "%WS%\python.code-snippets" >nul
echo [OK] Workspace profile installed in %WS%

if /I "%1"=="user" (
  if not exist "%USERDIR%\snippets" mkdir "%USERDIR%\snippets"
  if exist "%USERDIR%\keybindings.json" if not exist "%USERDIR%\keybindings.json.bak" copy "%USERDIR%\keybindings.json" "%USERDIR%\keybindings.json.bak" >nul
  copy /Y "%SRC%\keybindings.json" "%USERDIR%\keybindings.json" >nul
  copy /Y "%SRC%\python.json"      "%USERDIR%\snippets\python.json" >nul
  echo [OK] Keybindings and snippets installed in %USERDIR%
) else (
  echo To also install keyboard shortcuts for all projects run:  install_vscode_profile.bat user
)
echo Restart VS Code and install the recommended extensions when prompted.
endlocal
