# PDF Operations API Specification

## Overview
The `pdf_ops` module exposes a single entry point `process_request(json_str)` which accepts a JSON string and returns a JSON string.

## Request Format
```json
{
  "command": "string",
  "args": { ... }
}
```

## Response Format
### Success
```json
{
  "status": "ok",
  "output": "path/to/output_file.pdf"
}
```

### Error
```json
{
  "status": "error",
  "error": {
    "code": "string",
    "message": "string",
    "details": "optional string"
  }
}
```

## Commands

### `merge`
Combines multiple PDF files into one.
**Args:**
- `files`: List[str] - Absolute paths to input PDF files.
- `output`: str - Absolute path to output PDF file.

### `split`
Splits a PDF file.
**Args:**
- `file`: str - Input PDF path.
- `pages`: List[str|int] - Pages to extract (e.g., "1-5", 7).
- `output`: str - Output path pattern or directory.

### `watermark`
Applies a watermark to a PDF.
**Args:**
- `file`: str - Input PDF path.
- `watermark_file`: str - Path to watermark image/PDF.
- `output`: str - Output PDF path.
- `options`: dict (optional)
  - `opacity`: float (0.0 - 1.0)
  - `position`: str ("center", "top-left", etc.)

### `compress`
Compresses a PDF.
**Args:**
- `file`: str - Input PDF path.
- `quality`: str ("low", "medium", "high")
- `output`: str - Output PDF path.
