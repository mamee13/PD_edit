{
  "project": "PDFly Flutter Offline App (Track B) - Embedded Python",
  "summary": "Offline mobile app (Flutter) with an embedded Python runtime and pdfly for local PDF manipulation on Android and iOS. Track B: Python runtime bundled on-device (no network). 10-day focused plan plus full feature list and deliverables.",
  "goals": [
    "Fully offline PDF manipulation (merge, split, watermark, compress, etc.)",
    "Embed Python runtime (pyoxidizer or python-build-standalone) for Android & iOS",
    "Provide Flutter UI that calls Python functions via a native FFI bridge",
    "Prepare App Store & Play Store submissions with privacy-ready metadata",
    "Ship within ~10 days while maintaining App-Store safety (no downloaded code)"
  ],
  "priority": {
    "must_have": [
      "Merge",
      "Split",
      "Watermark/Stamp",
      "Compress/Optimize",
      "Preview (PDF viewer)",
      "Local file picker & storage",
      "Embedded Python runtime bundled (no downloads)",
      "Flutter ↔ native bridge (FFI) to call Python functions",
      "Progress indicator for long ops",
      "Basic error handling & user messages",
      "Privacy policy: local-only processing"
    ],
    "nice_to_have": [
      "Page reorder",
      "Rotate",
      "Crop pages",
      "Extract text (pdfly or text-extraction)",
      "Search inside PDF",
      "Thumbnail view",
      "Batch operations (apply to multiple files)",
      "History / operation log",
      "Save as / export / share",
      "Password protect & decrypt (if user provides password)",
      "Local undo of last operation",
      "Dark mode",
      "Accessibility labels and localization (English + Amharic)"
    ],
    "advanced_features": [
      "Annotate (highlight, comments, ink)",
      "Form fill & save (PDF forms)",
      "Signatures (draw or import signature image)",
      "OCR (optional, heavy; offer as optional module)",
      "Template-based stamping (multiple watermark templates)",
      "Local backups (export project bundle)",
      "Local analytics (opt-in, privacy-first)"
    ]
  },
  "project_structure_recommendation": {
    "top_level": [
      "flutter_app/   (Flutter project)",
      "python_runtime/   (bundled python + site-packages + app scripts)",
      "native_bridge/    (C/Rust shim source + prebuilt binaries)",
      "scripts/          (build/bundle/sign scripts)",
      "docs/             (store metadata, privacy policy, assets)",
      "samples/          (sample PDFs for testing)"
    ],
    "python_runtime_contents": [
      "bin/ (python executables for target ABIs)",
      "lib/ (libpython / shared libs)",
      "site-packages/ (pdfly + dependencies)",
      "app/ (pdf_ops.py and helper scripts)"
    ]
  },
  "day_by_day_plan": [
    {
      "day": 1,
      "title": "Prep, repo & toolchain setup",
      "tasks": [
        "Create repository and branches: main, dev, android-bridge, ios-bridge",
        "Install dev tools in IDE: Flutter SDK, Android SDK, Xcode (mac), Rust toolchain, Python 3.10 (host)",
        "Create initial folder structure (see project_structure_recommendation)",
        "Write an MVP spec and feature-priority list in repo (README or doc)",
        "Prepare App Store & Play Store dev accounts (ensure Apple Developer subscription available)"
      ],
      "deliverables": [
        "Repo skeleton committed",
        "MVP spec document",
        "List of required platform accounts & credentials"
      ]
    },
    {
      "day": 2,
      "title": "Build embeddable Python runtime (PyOxidizer or equivalent)",
      "tasks": [
        "Choose bundling tool (PyOxidizer recommended) and install Rust toolchain if needed",
        "Create pyoxidizer/build plan for target platforms (android arm64/x86_64, iOS arm64 & simulator)",
        "Build initial standalone Python artifact(s) and copy runtime files into python_runtime/",
        "Document exact runtime file layout and platform-specific notes"
      ],
      "deliverables": [
        "python_runtime/ with basic Python stdlib + runtime binaries for one or more targets",
        "Build notes & commands saved in scripts/"
      ]
    },
    {
      "day": 3,
      "title": "Install pdfly and dependencies into runtime; write pdf_ops API spec",
      "tasks": [
        "Install pdfly, pikepdf, pillow, reportlab (and any pure-Python fallbacks) into python_runtime/site-packages",
        "Create the pdf_ops API spec (function names, arguments, expected JSON outputs and error formats)",
        "Write exception & logging conventions for pdf_ops (JSON error object with code/message)",
        "Create a short test plan for python_runtime to validate imports"
      ],
      "deliverables": [
        "python_runtime/site-packages populated",
        "pdf_ops API specification (no code) saved under docs/",
        "Quick manual test proof (logs showing Python can import pdfly) documented"
      ]
    },
    {
      "day": 4,
      "title": "Native bridge design & PoC plan (C or Rust shim)",
      "tasks": [
        "Choose bridge implementation language: C (Python/C API) or Rust (pyo3) depending on team skills",
        "Define FFI interface: init_python(), call_function(module, function, json_args), get_status(), cleanup()",
        "Design messaging format (JSON in/out), and progress reporting approach (status file or polling API)",
        "Write build plan to produce platform-shared libraries (.so/.dylib/.framework) per platform"
      ],
      "deliverables": [
        "native_bridge interface spec (function signatures, types)",
        "Build matrix for native bridge per-ABI"
      ]
    },
    {
      "day": 5,
      "title": "Flutter FFI integration & minimal UI (file picker & run button)",
      "tasks": [
        "Implement FFI consumer design in Flutter (native library loader logic and JSON wrapper)",
        "Create minimal UI screens: Home, File Picker, Operation selection, Result/Preview placeholder",
        "Wire file picker to choose local files and pass file paths to the FFI layer",
        "Implement simple error display and toast/snackbar UX"
      ],
      "deliverables": [
        "Flutter app skeleton with FFI hooks",
        "UI flows mapped and accessible screens implemented"
      ]
    },
    {
      "day": 6,
      "title": "Android packaging & end-to-end test",
      "tasks": [
        "Package Python runtime into Android app assets and native .so into jniLibs for ABIs",
        "Ensure the native bridge is built for Android ABIs and placed in the app",
        "Run end-to-end operations on Android device/emulator: call pdf_ops.merge on sample PDFs and validate saved output",
        "Collect logs and iterate on dependency import issues (ABI/wheel problems)"
      ],
      "deliverables": [
        "Debuggable Android APK with embedded Python & bridge",
        "End-to-end test report with sample outputs"
      ]
    },
    {
      "day": 7,
      "title": "iOS packaging, signing & device tests",
      "tasks": [
        "Bundle Python runtime into iOS app bundle resources",
        "Link and sign native bridge library for iOS (dylib / framework); set correct @rpath and install names",
        "Test on iOS simulator and a real device; run basic pdf_ops operations and validate outputs",
        "Document any code-signing or entitlement issues and solutions"
      ],
      "deliverables": [
        "Xcode project configured to include python_runtime assets",
        "Successful device run logs (or documented blockers if any)"
      ]
    },
    {
      "day": 8,
      "title": "Complete feature implementations & UX polish",
      "tasks": [
        "Complete python-side pdf_ops functions: merge, split, watermark, compress, rotate, page reorder, extract_text",
        "Add progress reporting mechanism (status file, small polling API, or callback events)",
        "Implement preview (Flutter PDF viewer), thumbnails, and Save/Share UX flow",
        "Add history log (local DB) and basic file manager actions (open, delete, rename)"
      ],
      "deliverables": [
        "All core features implemented and callable from Flutter",
        "Progress UI and preview working",
        "History stored in local DB"
      ]
    },
    {
      "day": 9,
      "title": "Testing, optimization & final QA",
      "tasks": [
        "Run integration tests on multiple devices (low-end & high-end), including 50–200 page PDFs",
        "Profile memory and CPU for large operations; apply fixes (chunk processing, GC, interpreter restarts if needed)",
        "Strip unneeded runtime components to reduce app size; prepare compressed assets",
        "Complete accessibility & localization (add Amharic strings if possible)"
      ],
      "deliverables": [
        "Performance test report",
        "Optimized runtime & reduced package size",
        "Localization strings ready"
      ]
    },
    {
      "day": 10,
      "title": "Release builds & store submission",
      "tasks": [
        "Build Android AAB signed for release and upload to Play Console (internal testing track)",
        "Archive & sign iOS build in Xcode, upload to App Store Connect, create TestFlight build",
        "Prepare store metadata: screenshots, app description, privacy policy (explicitly state local-only processing), icons",
        "Submit both stores for review and prepare a response template for potential App-Store questions about embedded interpreter (explain no remote code downloads)"
      ],
      "deliverables": [
        "Android AAB uploaded to Play Console (internal test)",
        "iOS IPA uploaded to App Store Connect / TestFlight",
        "Store metadata and privacy policy documents"
      ]
    }
  ],
  "features_full_list": [
    {
      "name": "Merge",
      "priority": "must_have",
      "description": "Combine multiple PDFs into a single PDF; support reordering pages before finalizing."
    },
    {
      "name": "Split / Extract pages",
      "priority": "must_have",
      "description": "Split a PDF into multiple files by page ranges or extract selected pages."
    },
    {
      "name": "Watermark / Stamp",
      "priority": "must_have",
      "description": "Apply an image or PDF watermark/stamp (single or tiled), opacity control and position settings."
    },
    {
      "name": "Compress / Optimize",
      "priority": "must_have",
      "description": "Reduce file size with quality/size tradeoff; allow presets (low/medium/high)."
    },
    {
      "name": "Preview PDF",
      "priority": "must_have",
      "description": "In-app PDF viewer for results and originals with page navigation."
    },
    {
      "name": "Local file picker & file management",
      "priority": "must_have",
      "description": "Pick files from local storage, manage results in app, rename/delete and clean temp files."
    },
    {
      "name": "Page reorder",
      "priority": "nice_to_have",
      "description": "Drag & drop pages to reorder within a PDF prior to saving."
    },
    {
      "name": "Rotate & Crop pages",
      "priority": "nice_to_have",
      "description": "Rotate pages by 90/180/270 and crop page bounds."
    },
    {
      "name": "Extract text / search",
      "priority": "nice_to_have",
      "description": "Extract selectable text from PDFs and provide search across document."
    },
    {
      "name": "Thumbnails & multi-page view",
      "priority": "nice_to_have",
      "description": "Show thumbnails grid and allow multi-page export options."
    },
    {
      "name": "Batch operations",
      "priority": "nice_to_have",
      "description": "Run same operation across multiple files (e.g., stamp 20 files)."
    },
    {
      "name": "History / operation log",
      "priority": "nice_to_have",
      "description": "Local log of operations with timestamps, input files, and output path for quick retry."
    },
    {
      "name": "Share / Save as / Export",
      "priority": "must_have",
      "description": "Export processed file to other apps or save to file system."
    },
    {
      "name": "Password protection & decrypt",
      "priority": "nice_to_have",
      "description": "Allow opening password-protected PDFs (user-supplied password) and optionally set passwords on outputs."
    },
    {
      "name": "Annotate & Form fill",
      "priority": "advanced_features",
      "description": "Add highlights, notes, draw ink, and fill PDF forms (optional advanced module)."
    },
    {
      "name": "Signatures",
      "priority": "advanced_features",
      "description": "Draw, import or place a signature image and flatten signature onto PDF."
    },
    {
      "name": "OCR (optional)",
      "priority": "advanced_features",
      "description": "Offer optional OCR module (heavy CPU + storage) for scanned PDFs; keep as optional download or absent if avoiding downloads."
    },
    {
      "name": "Offline-first UX",
      "priority": "must_have",
      "description": "All functionality works without network; app shows clear 'offline' privacy messaging."
    },
    {
      "name": "Localization & Accessibility",
      "priority": "must_have",
      "description": "Support English and Amharic strings, accessibility labels and readable fonts; high-contrast mode and screen-reader friendly flows."
    },
    {
      "name": "App settings and storage manager",
      "priority": "must_have",
      "description": "Settings for default output folder, max temp folder size, cleanup schedule, and privacy toggles."
    },
    {
      "name": "Onboarding & in-app help",
      "priority": "must_have",
      "description": "Short onboarding for first-run and a help screen describing local processing and basic instructions."
    }
  ],
  "data_contracts_and_apis": {
    "pdf_ops_api_spec": {
      "format": "JSON in/out",
      "standard_response": {
        "status": "ok|error",
        "output": "path to output file (if status=ok)",
        "error": {
          "code": "string",
          "message": "string",
          "details": "optional string"
        }
      },
      "functions": [
        {
          "name": "merge",
          "args": {
            "files": ["array of absolute file path strings"],
            "output": "absolute output path string"
          }
        },
        {
          "name": "split",
          "args": {
            "file": "input file path",
            "pages": "array of pages or page ranges",
            "output": "output path or pattern"
          }
        },
        {
          "name": "watermark",
          "args": {
            "file": "input path",
            "watermark_file": "path to watermark (pdf/image)",
            "options": {"opacity": "0-1", "position": "string", "scale": "float"},
            "output": "output path"
          }
        },
        {
          "name": "compress",
          "args": {
            "file": "input path",
            "quality": "low|medium|high or numeric",
            "output": "output path"
          }
        },
        {
          "name": "rotate",
          "args": {
            "file": "input path",
            "angle": "90|180|270",
            "pages": "optional list of page indices",
            "output": "output path"
          }
        }
      ]
    }
  },
  "testing_and_quality_assurance": {
    "unit_tests": [
      "Python unit tests for pdf_ops functions (input validation, error handling)",
      "Flutter widget tests for UI components (file picker, preview, status)",
      "Native bridge integration tests (call functions end-to-end)"
    ],
    "integration_tests": [
      "End-to-end tests on real Android devices and iOS devices (small/large PDFs)",
      "Stress tests with large files and many concurrent operations",
      "File-system permission tests (first-run flows)"
    ],
    "manual_tests": [
      "Try password-protected PDFs with known passwords",
      "Test file sharing and opening in other apps",
      "Test app when storage is low (edge case)",
      "Test localization strings and screen-reader flows"
    ],
    "performance": [
      "Memory and CPU profiling during merge/split/compress",
      "Measure operation duration vs file size and track improvements",
      "Add progress feedback for operations expected >3 seconds"
    ]
  },
  "store_submission_checklist": {
    "app_store": {
      "items": [
        "App Store Connect account active",
        "App privacy policy URL (explain local-only processing)",
        "App description, keywords, screenshots (iPhone + iPad sizes)",
        "Add export compliance answers (no remote code download; use built-in interpreter)",
        "Provide TestFlight build and invite internal testers",
        "Prepare reviewer notes explaining embedded Python usage and that no code is downloaded"
      ]
    },
    "play_store": {
      "items": [
        "Google Play Console account active",
        "AAB signed and uploaded to internal test track",
        "Privacy policy link (local-only processing)",
        "Store listing assets (screenshots, short & long descriptions)"
      ]
    }
  },
  "troubleshooting_common_issues": [
    {
      "issue": "Python import errors on device",
      "cause": "Missing site-packages or incorrect ABI for compiled wheels",
      "fixes": [
        "Ensure site-packages contains prebuilt wheels for target ABI",
        "Include required native libs in runtime",
        "Test imports in a local emulator before packaging"
      ]
    },
    {
      "issue": "Shared library (.so/.dylib) fails to load",
      "cause": "ABI mismatch or wrong install_name/@rpath on iOS",
      "fixes": [
        "Verify ABI (arm64 vs armeabi-v7a) and place libs in correct jniLibs/<ABI>/",
        "Fix @rpath and sign dylibs on iOS; set correct install_name in build"
      ]
    },
    {
      "issue": "App rejected for dynamic code execution",
      "cause": "App appears to download and execute new Python scripts",
      "fixes": [
        "Confirm all Python scripts and packages are bundled with the app and do not require network",
        "Prepare reviewer notes detailing offline-only processing"
      ]
    },
    {
      "issue": "Large app size",
      "cause": "Bundled Python + many site-packages",
      "fixes": [
        "Strip unused stdlib modules, remove debug symbols, compress assets",
        "Consider optional modules behind feature toggles (exclude heavy optional features)"
      ]
    }
  ],
  "security_and_policy_notes": [
    "Do NOT download or execute Python code from network after installation — Apple may reject apps that allow arbitrary code execution.",
    "State in privacy policy: all PDF processing is local, no user data leaves device (unless user explicitly shares file).",
    "If the app uses encryption functions beyond network TLS, answer export compliance accordingly in App Store Connect.",
    "Follow licensing requirements for third-party packages used (pdfly, pikepdf) and include license acknowledgments in About screen or docs."
  ],
  "assets_and_marketing": {
    "graphics": [
      "App icon (all required sizes)",
      "Launch screen / splash art",
      "Store screenshots for phones & tablets (highlight offline privacy)",
      "Promo video (optional 15–30s demo of key flows)"
    ],
    "docs": [
      "Short privacy policy page (hosted or embedded link)",
      "Support email & quick troubleshooting FAQ",
      "User guide / in-app help (Onboarding + Help screen)"
    ]
  },
  "final_deliverables": [
    "flutter_app/ with UI, FFI integration and preview",
    "python_runtime/ with embedded Python + site-packages + pdf_ops API spec",
    "native_bridge/ compiled artifacts for Android & iOS and source",
    "scripts/ to rebuild runtime and bundle artifacts",
    "release builds (Android AAB, iOS IPA uploaded to TestFlight)",
    "store metadata and privacy policy ready"
  ],
  "notes": [
    "This JSON is a blueprint for the full Track B implementation; follow the day-by-day plan in order but adapt to blockers (e.g., ABI/wheel issues).",
    "If iOS bundling becomes blocker, fallback to hybrid approach: native Dart PDF for iOS and embedded Python for Android to meet strict deadlines.",
    "Keep all Python source files bundled inside the app to comply with App-Store policies (no runtime downloads)."
  ]
}
