const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const samplePath = path.resolve('../python_runtime/sample1.pdf');
const baseUrl = 'http://localhost:3000/api';

async function testExtractText() {
    console.log('Testing Extract Text...');
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(samplePath));

        const res = await axios.post(`${baseUrl}/extract-text`, form, { headers: form.getHeaders() });
        console.log('Extract Text Result:', res.data);
    } catch (e) {
        console.error('Extract Text Failed:', e.message, e.response?.data);
    }
}

async function testExtractImages() {
    console.log('Testing Extract Images...');
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(samplePath));

        const res = await axios.post(`${baseUrl}/extract-images`, form, { headers: form.getHeaders() });
        console.log('Extract Images Result:', res.data);
    } catch (e) {
        console.error('Extract Images Failed:', e.message, e.response?.data);
    }
}

async function runTests() {
    if (!fs.existsSync(samplePath)) {
        console.error('Sample file not found');
        return;
    }
    await testExtractText();
    await testExtractImages();
}

runTests();
