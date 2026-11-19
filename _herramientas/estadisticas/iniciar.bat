@echo off
chcp 65001 >nul
title Estadisticas DVM - minimiza esta ventana, no la cierres
cd /d "%~dp0"
:inicio
estadisticas-dvm.exe
echo.
echo El programa se ha parado. Se vuelve a poner en marcha en 5 segundos...
timeout /t 5 >nul
goto inicio
