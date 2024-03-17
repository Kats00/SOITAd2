const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.route('/').get(async (req, res) => {
    res.render('LandingPage.ejs');
});

router.get('/get-password', async (req, res) => {
    try {
        const data = await fs.readFile('./private/password.txt', 'utf8');
        res.send(data); 
    } catch (error) {
        console.error("Error reading password file:", error);
        res.status(500).send("Internal Server Error: Unable to read password file");
    }
});

router.get('/get-json', async (req, res) => {
    try {
      const data = await fs.readFile('./public/assets/particles.json', 'utf8'); // Read file as UTF-8
      res.json(JSON.parse(data)); // Send parsed JSON data as response
    } catch (error) {
      console.error("Error reading JSON file:", error);
      res.status(500).send("Internal Server Error: Unable to read JSON file");
    }
  });

module.exports = router;
