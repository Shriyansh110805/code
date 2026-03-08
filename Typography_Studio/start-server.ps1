# Start a simple HTTP server for the Typography Studio
Write-Host "Starting Typography Studio Server..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $pythonCmd = "python3"
}

if ($pythonCmd) {
    Write-Host "Using Python HTTP Server" -ForegroundColor Green
    Write-Host "Server running at: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Open this URL in your browser: http://localhost:8000/app.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    & $pythonCmd -m http.server 8000
} else {
    Write-Host "Python not found. Trying PHP..." -ForegroundColor Yellow
    
    if (Get-Command php -ErrorAction SilentlyContinue) {
        Write-Host "Using PHP Built-in Server" -ForegroundColor Green
        Write-Host "Server running at: http://localhost:8000" -ForegroundColor Yellow
        Write-Host "Open this URL in your browser: http://localhost:8000/app.html" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host ""
        php -S localhost:8000
    } else {
        Write-Host "ERROR: No web server available!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install one of the following:" -ForegroundColor Yellow
        Write-Host "1. Python: https://www.python.org/downloads/" -ForegroundColor White
        Write-Host "2. Node.js (then run: npx http-server)" -ForegroundColor White
        Write-Host "3. Use VS Code Live Server extension" -ForegroundColor White
        Write-Host ""
        Write-Host "Or use VS Code:" -ForegroundColor Cyan
        Write-Host "- Install 'Live Server' extension" -ForegroundColor White
        Write-Host "- Right-click app.html" -ForegroundColor White
        Write-Host "- Select 'Open with Live Server'" -ForegroundColor White
    }
}
