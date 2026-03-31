@echo off
echo.
echo ==========================================
echo   BREW Cerveceria - Setup Script
echo ==========================================
echo.

REM Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado. Instala desde https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js: 
node --version

REM Check npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no encontrado.
    pause
    exit /b 1
)
echo [OK] npm:
npm --version

echo.
echo [1/5] Instalando dependencias raiz...
npm install
if %errorlevel% neq 0 ( echo ERROR en npm install raiz && pause && exit /b 1 )

echo.
echo [2/5] Instalando dependencias del API (NestJS)...
cd apps\api
npm install
if %errorlevel% neq 0 ( echo ERROR en npm install api && pause && exit /b 1 )

echo.
echo [3/5] Preparando base de datos (SQLite + Prisma)...
copy ..\..\  .env.example .env 2>nul || copy /y ..\..\  .env.example .env 2>nul
if not exist .env (
    echo DATABASE_URL="file:./dev.db" > .env
    echo JWT_SECRET="brew-super-secret-change-in-production-min-32-chars" >> .env
    echo JWT_EXPIRES_IN="8h" >> .env
    echo ADMIN_EMAIL="admin@brew.com" >> .env
    echo ADMIN_PASSWORD="brew-admin-2026" >> .env
    echo API_PORT=3001 >> .env
    echo API_PREFIX=api >> .env
    echo NEXT_PUBLIC_API_URL="http://localhost:3001/api" >> .env
)
npx prisma generate
npx prisma migrate dev --name init
npx ts-node -r tsconfig-paths/register prisma/seed.ts
cd ..\..

echo.
echo [4/5] Instalando dependencias del frontend (Next.js)...
cd apps\web
npm install
if not exist .env.local (
    echo NEXT_PUBLIC_API_URL="http://localhost:3001/api" > .env.local
)
cd ..\..

echo.
echo [5/5] Copiando imagenes de ejemplo...
if not exist apps\web\public mkdir apps\web\public
copy images\hero.png apps\web\public\hero.png 2>nul
copy images\ipa.png apps\web\public\ipa.png 2>nul
copy images\stout.png apps\web\public\stout.png 2>nul
copy images\lager.png apps\web\public\lager.png 2>nul

echo.
echo ==========================================
echo   SETUP COMPLETADO!
echo ==========================================
echo.
echo Para iniciar el proyecto:
echo   Terminal 1 (API):      cd apps\api ^&^& npm run dev
echo   Terminal 2 (Frontend): cd apps\web ^&^& npm run dev
echo.
echo   API:        http://localhost:3001/api
echo   Docs:       http://localhost:3001/api/docs
echo   Sitio web:  http://localhost:3000
echo   Admin:      http://localhost:3000/admin
echo     Email:    admin@brew.com
echo     Password: brew-admin-2026
echo.
pause
