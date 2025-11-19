# Python Runtime Test Plan

## Unit Tests
Run standard Python unit tests using `unittest` or `pytest` (if installed).
Tests should cover `pdf_ops.py` functions.

### Test Cases
1.  **Merge**:
    - Merge 2 valid PDFs.
    - Merge 1 PDF (should work or error depending on spec).
    - Merge with missing file.
2.  **Split**:
    - Split by page range.
    - Split invalid range.
3.  **Error Handling**:
    - Invalid JSON input.
    - Unknown command.
    - Malformed arguments.

## Integration Tests (Embedded)
Verify the runtime works when embedded/bundled.
1.  **Import Test**: Verify `import pdfly` works in the bundled environment.
2.  **End-to-End**: Call `process_request` with a sample merge command and check if output file is created.

## Manual Verification
- Run the built executable (on host) and pipe JSON input.
- Check log file creation.
