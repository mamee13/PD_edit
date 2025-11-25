const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Helper to call Python wrapper
const callPythonService = (command, args) => {
    return new Promise((resolve, reject) => {
        const pythonPath = process.env.PYTHON_RUNTIME_PATH || '../python_runtime';
        const pythonExec = process.env.PYTHON_EXECUTABLE || 'venv/Scripts/python';
        const wrapperScript = 'pdf_wrapper.py';

        const fullPythonExec = path.resolve(pythonPath, pythonExec);
        const fullWrapperScript = path.resolve(pythonPath, wrapperScript);

        const payload = JSON.stringify({ command, args });

        const pyProcess = spawn(fullPythonExec, [fullWrapperScript], {
            cwd: pythonPath
        });

        let stdoutData = '';
        let stderrData = '';

        pyProcess.stdin.write(payload);
        pyProcess.stdin.end();

        pyProcess.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        pyProcess.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        pyProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python process exited with code ${code}: ${stderrData}`));
                return;
            }
            try {
                const result = JSON.parse(stdoutData);
                resolve(result);
            } catch (e) {
                reject(new Error(`Failed to parse Python output: ${stdoutData}`));
            }
        });
    });
};

// Routes
app.get('/status', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/merge', upload.array('files'), async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
        }

        const inputFiles = req.files.map(f => f.path);
        const outputFilename = `merged-${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputFilename);

        // pdfly cat command: pdfly cat input1.pdf input2.pdf -o output.pdf
        const args = ['cat', ...inputFiles, '-o', outputPath];

        const result = await callPythonService('cat', [...inputFiles, '-o', outputPath]);

        if (result.returncode !== 0) {
            return res.status(500).json({ error: 'Merge failed', details: result.stderr });
        }

        res.json({
            message: 'Merge successful',
            output: outputFilename,
            downloadUrl: `/download/${outputFilename}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/download/:filename', (req, res) => {
    const filePath = path.join(outputDir, req.params.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

app.post('/api/split', upload.single('file'), async (req, res) => {
    try {
        if (!req.file || !req.body.pages) {
            return res.status(400).json({ error: 'File and pages argument required' });
        }

        const inputPath = req.file.path;
        const outputFilename = `split-${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputFilename);
        const pages = req.body.pages; // e.g., "1-3" or "1,3,5"

        // pdfly cat input.pdf 1-3 -o output.pdf
        const result = await callPythonService('cat', [inputPath, pages, '-o', outputPath]);

        if (result.returncode !== 0) {
            return res.status(500).json({ error: 'Split failed', details: result.stderr });
        }

        res.json({
            message: 'Split successful',
            output: outputFilename,
            downloadUrl: `/download/${outputFilename}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/rotate', upload.single('file'), async (req, res) => {
    try {
        if (!req.file || !req.body.angle) {
            return res.status(400).json({ error: 'File and angle argument required' });
        }

        const inputPath = req.file.path;
        const outputFilename = `rotated-${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputFilename);
        const angle = req.body.angle;

        // pdfly rotate input.pdf angle -o output.pdf
        const result = await callPythonService('rotate', [inputPath, angle, '-o', outputPath]);

        if (result.returncode !== 0) {
            return res.status(500).json({ error: 'Rotate failed', details: result.stderr });
        }

        res.json({
            message: 'Rotate successful',
            output: outputFilename,
            downloadUrl: `/download/${outputFilename}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/compress', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File required' });
        }

        const inputPath = req.file.path;
        const outputFilename = `compressed-${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputFilename);

        // pdfly compress input.pdf output.pdf
        const result = await callPythonService('compress', [inputPath, outputPath]);

        if (result.returncode !== 0) {
            return res.status(500).json({ error: 'Compress failed', details: result.stderr });
        }

        res.json({
            message: 'Compress successful',
            output: outputFilename,
            downloadUrl: `/download/${outputFilename}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/extract-text', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File required' });
        }

        const inputPath = req.file.path;

        // pdfly extract-text input.pdf
        const result = await callPythonService('extract-text', [inputPath]);

        if (result.returncode !== 0) {
            return res.status(500).json({ error: 'Extract text failed', details: result.stderr });
        }

        res.json({
            message: 'Extract text successful',
            text: result.stdout
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/extract-images', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File required' });
        }

        const inputPath = req.file.path;
        const timestamp = Date.now();
        const imagesDirName = `images-${timestamp}`;
        const imagesDirPath = path.join(outputDir, imagesDirName);

        if (!fs.existsSync(imagesDirPath)) {
            fs.mkdirSync(imagesDirPath);
        }

        // We need to run the command inside the images directory so images are extracted there
        // But callPythonService runs in python_runtime.
        // We need to modify callPythonService or use spawn directly here.
        // Or we can pass absolute path to input file and set cwd to imagesDirPath.

        // Let's use spawn directly here for custom CWD
        const pythonPath = process.env.PYTHON_RUNTIME_PATH || '../python_runtime';
        const pythonExec = process.env.PYTHON_EXECUTABLE || 'venv/Scripts/python';
        const wrapperScript = 'pdf_wrapper.py';
        const fullPythonExec = path.resolve(pythonPath, pythonExec);
        // We can't use wrapper because wrapper logic is fixed. 
        // Actually wrapper calls pdfly. 
        // If we use wrapper, pdfly runs in python_runtime. 
        // pdfly extract-images saves to CWD.
        // So we should run wrapper in the target directory? 
        // But wrapper is in python_runtime.

        // Better: Run pdfly directly via python -m pdfly
        // But we want to keep consistency.

        // Let's try to run the wrapper but pass a "cwd" option if we modify callPythonService?
        // Or just run spawn directly here for this specific case.

        const pdflyModule = 'pdfly';
        // We can run: python -m pdfly extract-images <inputPath>
        // CWD = imagesDirPath

        const pyProcess = spawn(fullPythonExec, ['-m', 'pdfly', 'extract-images', inputPath], {
            cwd: imagesDirPath
        });

        let stdoutData = '';
        let stderrData = '';

        pyProcess.stdout.on('data', (data) => stdoutData += data.toString());
        pyProcess.stderr.on('data', (data) => stderrData += data.toString());

        pyProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Extract images failed', details: stderrData });
            }

            // List files in the directory
            fs.readdir(imagesDirPath, (err, files) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to list extracted images' });
                }

                const imageUrls = files.map(file => `/download/${imagesDirName}/${file}`);

                res.json({
                    message: 'Extract images successful',
                    images: imageUrls,
                    count: files.length
                });
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Update download route to handle subdirectories
app.get('/download/:folder/:filename?', (req, res) => {
    let filePath;
    if (req.params.filename) {
        // /download/folder/filename
        filePath = path.join(outputDir, req.params.folder, req.params.filename);
    } else {
        // /download/filename (folder is actually filename)
        filePath = path.join(outputDir, req.params.folder);
    }

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
