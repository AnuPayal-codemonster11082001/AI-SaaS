const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

require('dotenv').config();

console.log(process.env);
// This line tells Node to serve everything inside the "public" folder
app.use(express.static('public'));

// This sends your index.html file when you go to the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Your site is running at http://localhost:${PORT}`);
});