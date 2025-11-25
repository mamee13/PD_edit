import sys
import json
import subprocess
import os

def main():
    try:
        # Read JSON input from stdin
        input_data = sys.stdin.read()
        if not input_data:
            print(json.dumps({"error": "No input provided"}))
            return

        command_obj = json.loads(input_data)
        cmd = command_obj.get("command")
        args = command_obj.get("args", [])
        
        if not cmd:
            print(json.dumps({"error": "No command specified"}))
            return

        # Construct the pdfly command
        # Assuming pdfly is in the path or same venv
        # We use sys.executable to find the python interpreter, then find pdfly script or module
        # Better: use "pdfly" directly if in path, or "python -m pdfly"
        
        pdfly_cmd = [sys.executable, "-m", "pdfly", cmd] + args
        
        result = subprocess.run(
            pdfly_cmd,
            capture_output=True,
            text=True,
            check=False
        )
        
        output = {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        }
        
        print(json.dumps(output))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
