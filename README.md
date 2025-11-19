# PDFly Flutter Offline App (Track B)

**Summary**: Offline mobile app (Flutter) with an embedded Python runtime and pdfly for local PDF manipulation on Android and iOS. Track B: Python runtime bundled on-device (no network).

## Goals
- Fully offline PDF manipulation (merge, split, watermark, compress, etc.)
- Embed Python runtime (pyoxidizer or python-build-standalone) for Android & iOS
- Provide Flutter UI that calls Python functions via a native FFI bridge
- Prepare App Store & Play Store submissions with privacy-ready metadata
- Ship within ~10 days while maintaining App-Store safety (no downloaded code)

## Feature Priority

### Must Have
- Merge
- Split
- Watermark/Stamp
- Compress/Optimize
- Preview (PDF viewer)
- Local file picker & storage
- Embedded Python runtime bundled (no downloads)
- Flutter ↔ native bridge (FFI) to call Python functions
- Progress indicator for long ops
- Basic error handling & user messages
- Privacy policy: local-only processing

### Nice to Have
- Page reorder
- Rotate
- Crop pages
- Extract text (pdfly or text-extraction)
- Search inside PDF
- Thumbnail view
- Batch operations (apply to multiple files)
- History / operation log
- Save as / export / share
- Password protect & decrypt (if user provides password)
- Local undo of last operation
- Dark mode
- Accessibility labels and localization (English + Amharic)

### Advanced Features
- Annotate (highlight, comments, ink)
- Form fill & save (PDF forms)
- Signatures (draw or import signature image)
- OCR (optional, heavy; offer as optional module)
- Template-based stamping (multiple watermark templates)
- Local backups (export project bundle)
- Local analytics (opt-in, privacy-first)

## Project Structure
- `flutter_app/`: Flutter project
- `python_runtime/`: Bundled python + site-packages + app scripts
- `native_bridge/`: C/Rust shim source + prebuilt binaries
- `scripts/`: Build/bundle/sign scripts
- `docs/`: Store metadata, privacy policy, assets
- `samples/`: Sample PDFs for testing
