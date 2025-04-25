// generateJson.js
const fs = require('fs');

// Data to be written to the JSON file
const data = {
  name: "Dynamic Website",
  version: "1.0.0",
  description: "This is a sample dynamic website"
};

// Write the JSON data to a file
fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('JSON file created successfully.');
