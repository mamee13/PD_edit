# Python Runtime Layout

## Source Structure
```
python_runtime/
├── pyoxidizer.bzl      # Build configuration
├── app/                # Application code
│   ├── __init__.py
│   └── pdf_ops.py      # Main entry point for operations
└── site-packages/      # (Future) Third-party dependencies
```

## Build Artifacts
After running `pyoxidizer build`, artifacts are located in:
`python_runtime/build/<target_triple>/<release_type>/`

For example, on Windows:
`python_runtime/build/x86_64-pc-windows-msvc/debug/`

## Embedded Content
The runtime embeds:
1.  **Python Interpreter**: Standalone Python 3.10+
2.  **Standard Library**: Minimal set required for operation.
3.  **App Package**: The `app` directory containing `pdf_ops.py`.
4.  **Dependencies**: (Planned) `pdfly`, `pikepdf`, etc.

## Platform Targets
- **Android**: `aarch64-linux-android`, `armv7-linux-androideabi`
- **iOS**: `aarch64-apple-ios`
- **Host (Dev)**: `x86_64-pc-windows-msvc`

## Build Commands
- **Host**: `pyoxidizer build`
- **Android**: `pyoxidizer build --target-triple aarch64-linux-android` (Requires additional config)
