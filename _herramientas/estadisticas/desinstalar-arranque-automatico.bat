@echo off
chcp 65001 >nul
net session >nul 2>&1
if errorlevel 1 (
  echo Hace falta ejecutarlo como ADMINISTRADOR: clic derecho y "Ejecutar como administrador".
  pause
  exit /b 1
)
schtasks /Delete /TN "Estadisticas DVM" /F
taskkill /IM estadisticas-dvm.exe /F >nul 2>&1
echo El contador ya no arranca solo y se ha parado.
pause
