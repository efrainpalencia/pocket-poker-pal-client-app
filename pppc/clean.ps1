Write-Host "🧹 Cleaning up your Expo project..." -ForegroundColor Cyan

# Step 1: Delete node_modules and package-lock.json
if (Test-Path -Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✔️ node_modules deleted"
}
if (Test-Path -Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "✔️ package-lock.json deleted"
}

# Step 2: Reinstall dependencies
Write-Host "📦 Reinstalling dependencies..."
npm install

# Step 3: Clear Expo & Metro cache
Write-Host "🚀 Starting Expo with cache cleared..."
npx expo start --clear
