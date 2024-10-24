const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Middleware
app.use(bodyParser.json());

// Push data to the site
app.post('/push', (req, res) => {
    const { content } = req.body;
    fs.writeFileSync(path.join(__dirname, 'siteContent.json'), JSON.stringify({ content }));
    res.status(200).send('Content pushed');
});

// Pull data from the site
app.get('/pull', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname, 'siteContent.json'));
    res.status(200).json(JSON.parse(content));
});

// Create pop-up ad
app.post('/create-ad', (req, res) => {
    const { adContent } = req.body;
    fs.writeFileSync(path.join(__dirname, 'ads.json'), JSON.stringify({ adContent }));
    res.status(200).send('Ad created');
});

// Lock the site
app.post('/lock-site', (req, res) => {
    // Logic to lock the site (e.g., writing to a lock file)
    fs.writeFileSync(path.join(__dirname, 'siteLock.json'), JSON.stringify({ locked: true }));
    res.status(200).send('Site locked');
});

// Unlock the site
app.post('/unlock-site', (req, res) => {
    // Logic to unlock the site (e.g., removing the lock file)
    fs.unlinkSync(path.join(__dirname, 'siteLock.json'));
    res.status(200).send('Site unlocked');
});

// Change site theme
app.post('/change-theme', (req, res) => {
    // Logic to change the theme (e.g., saving the selected theme)
    fs.writeFileSync(path.join(__dirname, 'theme.json'), JSON.stringify({ theme: 'dark' }));
    res.status(200).send('Theme changed');
});

// Change site language
app.post('/change-language', (req, res) => {
    // Logic to change the language (e.g., saving the selected language)
    fs.writeFileSync(path.join(__dirname, 'language.json'), JSON.stringify({ language: 'English' }));
    res.status(200).send('Language changed');
});

// Generate API key
app.get('/generate-api-key', (req, res) => {
    const apiKey = 'API-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    res.status(200).json({ apiKey });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
