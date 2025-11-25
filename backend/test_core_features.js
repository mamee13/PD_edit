const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const samplePath = path.resolve('../python_runtime/sample1.pdf');
const baseUrl = 'http://localhost:3000/api';

async function testSplit() {
    console.log('Testing Split...');
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(samplePath));
        form.append('pages', '1'); // Split page 1

        const res = await axios.post(`${baseUrl}/split`, form, { headers: form.getHeaders() });
        console.log('Split Result:', res.data);
    } catch (e) {
        console.error('Split Failed:', e.message, e.response?.data);
    }
}

async function testRotate() {
    console.log('Testing Rotate...');
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(samplePath));
        form.append('angle', '90');

        const res = await axios.post(`${baseUrl}/rotate`, form, { headers: form.getHeaders() });
        console.log('Rotate Result:', res.data);
    } catch (e) {
        console.error('Rotate Failed:', e.message, e.response?.data);
    }
}

async function testCompress() {
    console.log('Testing Compress...');
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(samplePath));

        const res = await axios.post(`${baseUrl}/compress`, form, { headers: form.getHeaders() });
        console.log('Compress Result:', res.data);
    } catch (e) {
        console.error('Compress Failed:', e.message, e.response?.data);
    }
}

async function runTests() {
    if (!fs.existsSync(samplePath)) {
        console.error('Sample file not found');
        return;
    }
    await testSplit();
    await testRotate();
    await testCompress();
}

runTests();
