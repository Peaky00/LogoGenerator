const fs = require('fs');
const { create } = require('@svgdotjs/svg.js'); // Import 'create' from SVG.js

// Function to create a simple logo
function createLogo(text, textColor, shape, shapeColor) {
  const width = 300;
  const height = 200;

  // Create an SVG document using 'create' method
  const svg = create().size(width, height);

  // Draw the shape
  if (shape === 'circle') {
    svg.circle(100).move(100, 50).fill(shapeColor);
  } else if (shape === 'triangle') {
    svg.polygon([ [100, 50], [200, 150], [50, 150] ]).fill(shapeColor);
  } else if (shape === 'square') {
    svg.rect(100, 100).move(100, 50).fill(shapeColor);
  }

  // Add the text
  svg.text(text).move(50, 75).font({ size: 48, fill: textColor });

  // Save the SVG file
  fs.writeFileSync('logo.svg', svg.svg());

  console.log('Generated logo.svg');
}

// Get user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for input
readline.question('Enter up to three characters: ', (text) => {
  readline.question('Enter text color (keyword or hex code): ', (textColor) => {
    readline.question('Choose a shape (circle, triangle, square): ', (shape) => {
      readline.question('Enter shape color (keyword or hex code): ', (shapeColor) => {
        // Close the input interface
        readline.close();

        // Create the logo
        createLogo(text, textColor, shape, shapeColor);
      });
    });
  });
});
