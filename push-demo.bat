@echo off
REM ── MadsJeez Design · Git Push Script ──────────────────────────────────────
REM Ejecuta esto desde la carpeta del proyecto para hacer commit y push
REM Uso: push-demo.bat "mensaje del commit"

cd /d "%~dp0"

IF "%~1"=="" (
  SET MSG=feat: demo updates
) ELSE (
  SET MSG=%~1
)

echo.
echo [MadsJeez] Agregando cambios...
git add -A

echo [MadsJeez] Haciendo commit: %MSG%
git commit -m "%MSG%"

echo [MadsJeez] Pusheando a GitHub...
git push origin main

echo.
echo [MadsJeez] Push completo! Revisá Railway para el deploy.
pause
