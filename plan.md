{
"project": "PDF Manipulation Web — Single-Server Hosted (Node.js + pdfly Python service)",
"approach": "Single VM / single-server deployment running both Node.js backend and embedded Python pdfly service. Fastest path: install Python and Node directly on server, run both as system services, expose Node API to clients, keep filesystem storage local on server.",
"server_requirements": {
"os": "Ubuntu 22.04 LTS (or similar Linux distro)",
"cpu": "2 vCPU (scale up if heavy load)",
"ram": "4 GB (increase for large PDF workloads)",
"disk": "50 GB (SSD recommended) with additional space for temporary PDFs",
"network": "Public IP and DNS control",
"accounts": "SSH access, sudo privileges, domain DNS control"
},
"pre_requisites_local": [
"Git repository with backend/, frontend/, python_runtime/ folders",
"Node.js LTS installed locally for development",
"Python 3.10+ for building/testing pdfly code locally",
"Sample PDFs in samples/ for testing"
],
"high_level_steps": [
"Provision server (VM) with SSH access",
"Install system dependencies (Node, Python, nginx)",
"Prepare and test Python pdfly service locally",
"Prepare and test Node backend locally",
"Set up systemd services to run Node and Python services on the server",
"Configure nginx as reverse proxy and SSL termination",
"Deploy code to server and run end-to-end tests",
"Set up basic monitoring, logs and automated cleanup",
"Create deployment runbook"
],
"detailed_step_by_step_tasks": [
{
"step": "Provision server",
"tasks": [
"Create a cloud VM (DigitalOcean / AWS / Linode / DO) with recommended spec",
"Add SSH public key to server user",
"Create swap (if needed) and ensure firewall (allow SSH, HTTP, HTTPS)"
]
},
{
"step": "System setup",
"tasks": [
"Update package lists and apply system updates",
"Create dedicated app user (non-root) for running services",
"Install build-essential tools (compiler toolchain) and curl/wget",
"Install Node.js LTS and npm or yarn",
"Install Python 3.10+ and pip",
"Install nginx for reverse proxy"
]
},
{
"step": "Prepare Python runtime and pdfly locally",
"tasks": [
"On your dev machine: create the python_runtime/ layout and test pdf_ops functions using local Python",
"Install pdfly and any Python dependencies into a venv and validate merge/split/watermark operations locally",
"If desired, create a minimal HTTP wrapper (python microservice) or CLI script that accepts JSON input and returns JSON output (no external code downloads)"
]
},
{
"step": "Prepare Node backend locally",
"tasks": [
"Implement Node API routes /merge /split /watermark /compress /status according to agreed JSON contract",
"Implement Node orchestration to call Python microservice via HTTP or spawn Python CLI script and parse JSON responses",
"Implement temp file management strategy (app data folder, unique names, cleanup after success or failure)",
"Implement basic logging for each operation (input, output path, duration, errors)",
"Test Node endpoints locally against the python_runtime using sample PDFs"
]
},
{
"step": "Server deployment scaffold",
"tasks": [
"Push code to remote Git repository",
"Clone repo on server under the dedicated app user",
"Set up environment variables files (.env) on the server (not in repo) for Node and Python service configuration",
"Create directories for persistent storage: app_data/input, app_data/output, app_logs, app_tmp"
]
},
{
"step": "Install runtime on server",
"tasks": [
"On server: install Node.js runtime (same major version as dev) and pip for Python 3.10",
"Create a Python virtual environment on server and pip-install pdfly and required packages into it (or copy built site-packages if using portable runtime)",
"Verify Python service runs on server in test mode (call it manually to merge sample PDFs)",
"Install Node dependencies in backend/ on server and verify Node server runs in test mode"
]
},
{
"step": "Service management (systemd)",
"tasks": [
"Create systemd service unit for Python microservice (executes venv python with the wrapper) so it restarts on failure",
"Create systemd service unit for Node backend (executes node index.js or PM2-managed process)",
"Enable and start both services and verify they auto-restart on reboot",
"Ensure services run under the dedicated app user and have access to app_data folders"
]
},
{
"step": "Reverse proxy and SSL",
"tasks": [
"Configure nginx as reverse proxy: route /api/* to Node backend (localhost:PORT) and route /pdf-service/* to python service if necessary (or keep Python behind Node)",
"Set up SSL with Certbot (Let’s Encrypt) or use the host provider’s managed certs",
"Configure HTTP->HTTPS redirect and basic security headers (X-Frame-Options, X-XSS-Protection)",
"Test HTTPS endpoints and ensure certificate auto-renewal is configured"
]
},
{
"step": "Database / persistence (optional)",
"tasks": [
"If you need history/log storage: install PostgreSQL or use SQLite for simple deployments",
"Create database user and schema, update backend config to point to DB",
"Run DB migrations locally and on server (if applicable)"
]
},
{
"step": "File handling, permissions, and cleanup",
"tasks": [
"Set ownership and permissions on app data folders so services can read/write",
"Implement an automated cleanup cron job or systemd timer to remove temp files older than threshold",
"Verify backup snapshot policy for any persistent storage used"
]
},
{
"step": "Deploy frontend",
"tasks": [
"Build frontend static assets locally or on server",
"Serve frontend via nginx (static files) or use Node to serve the built app",
"Verify frontend can call Node API endpoints over HTTPS"
]
},
{
"step": "End-to-end testing on server",
"tasks": [
"Upload sample PDFs via frontend and trigger merge/split/watermark/compress operations",
"Confirm resulting PDFs are written to output folder and are viewable",
"Confirm logs record operations and services remain stable under test load"
]
},
{
"step": "Production hardening",
"tasks": [
"Configure process monitoring (systemd + journalctl or PM2) and log rotation",
"Add simple metrics: request rate, error count, average operation time (can be simple log counters)",
"Tune ulimits and worker settings if Node or Python uses thread pools or subprocesses",
"Strip debug flags and run services in production mode"
]
},
{
"step": "Monitoring & alerting",
"tasks": [
"Install basic monitoring agent (cloud provider agent or Prometheus exporter) or use a managed small observability tool",
"Configure alerts for service down, high CPU, low disk space",
"Set up simple log shipping (or download logs periodically) for post-mortem"
]
},
{
"step": "Deployment automation (optional but recommended)",
"tasks": [
"Create simple deploy script that pulls latest code, installs dependencies, restarts services, and runs basic smoke tests",
"Integrate with CI to push to server via SSH on successful main branch builds (deploy key or CI runner)",
"Keep rollback instructions and a tagged last-known-good release"
]
},
{
"step": "Runbook & documentation",
"tasks": [
"Document commands to restart services, view logs, and rebuild Python runtime",
"Add troubleshooting notes for common errors (Python import errors, permission denied, missing libs)",
"Save server access and config locations in the repo docs/deploy/readme"
]
}
],
"testing_checklist": [
"Merge multiple PDFs and verify page order and integrity",
"Split PDF by page ranges and verify each output file",
"Apply watermark and verify placement and opacity in output",
"Compress PDF and compare file sizes pre/post operation",
"Test edge cases: single-page PDF, very large PDF, corrupted PDF input (error handling)",
"Check service restarts after simulated crash and confirm systemd restarts the service"
],
"operational_tasks_after_launch": [
"Monitor logs for exceptions and resource spikes for first 48 hours",
"Run cleanup job daily to remove temp files older than X days",
"Rotate SSL certs automatically (ensure certbot auto-renew is enabled)",
"Keep OS and packages updated (schedule maintenance window)"
],
"rollback_plan": [
"If new deploy causes failures: revert to previous git tag, restart services, and validate smoke tests",
"If Python runtime fails: stop Node service, run Python tests manually, restore previous runtime artifact and restart services",
"If disk space full: disable ingestion endpoints, run cleanup script, remove large temp files, and scale disk if required"
],
"deliverables_on_completion": [
"Server with Node backend and Python pdfly service running as system services",
"Nginx reverse proxy with HTTPS and valid certificate",
"Frontend served and functional against backend APIs",
"Automated cleanup job for temp files and basic monitoring configured",
"Runbook with restart/redeploy instructions and troubleshooting tips"
],
"notes": [
"This plan assumes you accept running Python and Node directly on the same server for simplicity and speed.",
"If you later need horizontal scale or stronger isolation, convert the Python service into a container and use multiple instances behind a load balancer."
]
}