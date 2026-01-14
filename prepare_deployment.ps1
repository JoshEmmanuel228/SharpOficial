# Deploy Preparation Script
# This script builds the client and moves it to the server's public folder for production deployment.

Write-Host "Starting Deployment Preparation..." -ForegroundColor Green

# 1. Define Paths
$rootPath = Get-Location
$clientPath = Join-Path $rootPath "client"
$serverPath = Join-Path $rootPath "server"
$serverPublicPath = Join-Path $serverPath "public"

# 2. Build Client
Write-Host "Building Client..." -ForegroundColor Cyan
Set-Location $clientPath
if (-not (Test-Path "node_modules")) {
    npm install
}
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Client build failed!" -ForegroundColor Red
    exit 1
}

# 3. Clean and Copy to Server
Write-Host "Copying Client Build to Server..." -ForegroundColor Cyan
if (Test-Path $serverPublicPath) {
    Remove-Item -Path $serverPublicPath -Recurse -Force
}
New-Item -ItemType Directory -Path $serverPublicPath | Out-Null
Copy-Item -Path "$clientPath\build\*" -Destination $serverPublicPath -Recurse

# 4. Build Server (TypeScript)
Write-Host "Building Server..." -ForegroundColor Cyan
Set-Location $serverPath
if (-not (Test-Path "node_modules")) {
    npm install
}
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Server build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "The 'server' folder is now ready to be deployed to Azure." -ForegroundColor Green
Set-Location $rootPath
