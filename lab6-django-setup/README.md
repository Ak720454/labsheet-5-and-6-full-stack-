# Lab 6 - Back-end Environment Setup (Python, Django, VS Code)

Requires Python 3.10+ (python.org, tick **Add python.exe to PATH**) and VS Code.

## Task 6.1 - Isolated Django environment
```
setup_env.bat
```
Does: `python -m venv venv` -> activate -> `pip install -r requirements.txt` ->
`pip freeze > requirements.lock.txt` (pipe) -> `django-admin startproject mysite .`
`setup.py` is the formal setup configuration; it reads `requirements.txt`.
(Linux/macOS: `bash setup_env.sh`)

## Task 6.2 - VS Code profile for PEP8
```
install_vscode_profile.bat          (project settings, tasks, snippets)
install_vscode_profile.bat user     (also keyboard shortcuts for all projects)
```
| File | Purpose |
|---|---|
| `settings.json` | autopep8 formatter, 79-char ruler, format on save, 4 spaces, trim whitespace, use venv |
| `keybindings.json` | Ctrl+Alt+F format, Ctrl+Alt+I sort imports, Ctrl+Alt+R run file, Ctrl+Alt+S run server, Ctrl+Alt+C check env |
| `python.json` | snippets: `pep8func`, `pep8main`, `djview`, `djmodel` |
| `tasks.json` | Check Environment, Run Django Server, Format All |
| `extensions.json` | recommended extensions |

## Task 6.3 - Deployment check
```
check_env.bat
```
Checks Python version, venv, pip, PATH, packages in requirements.txt, Django,
`django-admin`, environment keys (`DJANGO_SETTINGS_MODULE`, `DJANGO_SECRET_KEY`,
`DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`) and `manage.py check`.
Prints PASS / WARN / FAIL per item and exits with code 1 if anything fails.
Keys are read from `.env` (copied from `.env.example` by the setup script).

## Full flow
```
setup_env.bat
install_vscode_profile.bat user
check_env.bat
venv\Scripts\activate
python manage.py runserver
```
