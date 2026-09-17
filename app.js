const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>DevOps Capstone Project</h1>
        <h2>End-to-End CI/CD Pipeline</h2>
        <p>My Node.js application is running successfully!</p>
    `);
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application running on port ${PORT}`);
});