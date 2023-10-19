const svgCaptcha = require('svg-captcha');
const fs = require('fs');

// Generate a random captcha (which will serve as your logo)
const captcha = svgCaptcha.create({
  size: 6,          // Number of characters in the text
  ignoreChars: '0oO1ilI', // Characters to exclude to avoid confusion
  noise: 2,         // Number of noise lines
  color: true,      // Enable colorful text
  background: '#fff', // Background color
});

// Save the generated SVG to a file
fs.writeFileSync('logo.svg', captcha.data);

console.log('Generated logo.svg');