# Build Python Runtime for Android

$ARCHS = @("aarch64-linux-android", "armv7-linux-androideabi", "x86_64-linux-android")
$RUNTIME_DIR = Join-Path $PSScriptRoot "..\python_runtime"

foreach ($arch in $ARCHS) {
    Write-Host "Building for $arch..."
    
    # Set environment variables for cross-compilation if needed
    # Note: PyOxidizer handles most of this, but we might need NDK paths later
    
    Push-Location $RUNTIME_DIR
    try {
        pyoxidizer build --target-triple $arch --release
    }
    finally {
        Pop-Location
    }
}

Write-Host "Android builds completed."
