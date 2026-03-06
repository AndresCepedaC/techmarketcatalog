@echo off
echo ==========================================
echo   LIMPIEZA Y REINSTALACION TECH MARKET
echo ==========================================
echo.
echo 1. Borrando node_modules...
if exist node_modules rd /s /q node_modules
echo 2. Borrando package-lock.json...
if exist package-lock.json del /f /q package-lock.json
echo 3. Limpiando cache de npm...
call npm cache clean --force
echo 4. Instalando dependencias desde cero...
call npm install
echo.
echo ==========================================
echo   PROCESO COMPLETADO EXITOSAMENTE
echo ==========================================
pause
