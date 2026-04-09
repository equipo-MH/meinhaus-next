powershell# deploy.ps1 — MeinHaus deploy script
param([string]$msg = "update")

Write-Host "Corriendo build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    git add -A
    git commit -m $msg
    git push origin main
    Write-Host "✓ Deploy iniciado en Vercel" -ForegroundColor Green
} else {
    Write-Host "✗ Build falló — no se commiteó nada" -ForegroundColor Red
    exit 1
}
