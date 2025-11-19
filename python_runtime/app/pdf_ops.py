import json
import sys
import os

# Placeholder for pdfly import
# import pdfly

def process_request(request_json):
    """
    Process a JSON request for PDF operations.
    Expected format:
    {
        "command": "merge|split|watermark|...",
        "args": { ... }
    }
    """
    try:
        request = json.loads(request_json)
        command = request.get("command")
        args = request.get("args", {})
        
        if command == "merge":
            return handle_merge(args)
        elif command == "split":
            return handle_split(args)
        else:
            return error_response("unknown_command", f"Command '{command}' not recognized")
            
    except json.JSONDecodeError:
        return error_response("invalid_json", "Could not parse request JSON")
    except Exception as e:
        return error_response("internal_error", str(e))

def handle_merge(args):
    # TODO: Implement merge using pdfly
    files = args.get("files", [])
    output = args.get("output")
    return success_response(output)

def handle_split(args):
    # TODO: Implement split using pdfly
    return success_response("split_output.pdf")

def success_response(output_path):
    return json.dumps({
        "status": "ok",
        "output": output_path
    })

def error_response(code, message):
    return json.dumps({
        "status": "error",
        "error": {
            "code": code,
            "message": message
        }
    })

if __name__ == "__main__":
    # Simple test
    print(process_request('{"command": "merge", "args": {"files": ["a.pdf", "b.pdf"], "output": "out.pdf"}}'))
