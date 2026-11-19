@echo off
chcp 65001 >nul
cd /d "%~dp0"
net session >nul 2>&1
if errorlevel 1 (
  echo.
  echo Hace falta ejecutarlo como ADMINISTRADOR:
  echo clic derecho sobre este archivo y "Ejecutar como administrador".
  echo.
  pause
  exit /b 1
)
echo Cerrando el contador si estaba abierto...
taskkill /IM estadisticas-dvm.exe /F >nul 2>&1
echo Creando la tarea automatica de Windows...
schtasks /Create /TN "Estadisticas DVM" /TR "wscript.exe \"%~dp0iniciar-oculto.vbs\"" /SC ONSTART /RU SYSTEM /RL HIGHEST /F
if errorlevel 1 (
  echo.
  echo No se ha podido crear la tarea. Haz una foto de este mensaje y mandasela a Claude.
  pause
  exit /b 1
)
echo Evitando que el ordenador se suspenda...
powercfg /change standby-timeout-ac 0
echo Arrancando el contador ahora...
schtasks /Run /TN "Estadisticas DVM"
echo.
echo LISTO. El contador ya funciona solo, sin ventana, y arrancara cada vez que se encienda el ordenador.
echo Para ver el panel: abrir-panel.bat
echo.
pause
