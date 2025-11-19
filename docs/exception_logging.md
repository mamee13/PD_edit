# Exception & Logging Conventions

## Exception Handling
All exceptions within `pdf_ops` must be caught and converted to a JSON error response.
The `process_request` function acts as the top-level exception handler.

### Error Codes
- `invalid_json`: Request is not valid JSON.
- `unknown_command`: Command not recognized.
- `missing_arg`: Required argument missing.
- `file_not_found`: Input file does not exist.
- `pdf_error`: Error processing PDF (corrupt, password protected, etc.).
- `internal_error`: Unexpected python exception.

## Logging
Since the runtime is embedded, standard stdout/stderr might not be visible or captured easily by the host app.
We will use a custom logger that writes to a log file in the app's data directory.

### Log Format
`[TIMESTAMP] [LEVEL] [MODULE] Message`

### Log Levels
- `DEBUG`: Detailed info for development.
- `INFO`: High-level operations (e.g., "Started merge", "Finished merge").
- `ERROR`: Exceptions and failures.

### Implementation
The `app` package will initialize logging on startup.
The log file path should be passed or determined relative to the app data directory.
