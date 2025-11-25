const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function testMerge() {
    try {
        const form = new FormData();
        const sample1Path = path.resolve('../python_runtime/sample1.pdf');
        const sample2Path = path.resolve('../python_runtime/sample2.pdf');

        if (!fs.existsSync(sample1Path) || !fs.existsSync(sample2Path)) {
            console.error('Sample files not found');
            return;
        }

        form.append('files', fs.createReadStream(sample1Path));
        form.append('files', fs.createReadStream(sample2Path));

        console.log('Sending request to http://localhost:3000/api/merge...');

        const response = await axios.post('http://localhost:3000/api/merge', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Response:', response.data);

        if (response.data.output) {
            console.log('Merge successful!');
        } else {
            console.error('Merge failed, no output file in response');
        }

    } catch (error) {
        console.error('Test failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testMerge();
