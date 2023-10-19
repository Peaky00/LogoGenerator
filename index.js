const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate an HTML file with the logo
const generateHTML = async (text, textColor, shape, shapeColor) => {
  let svgShape = '';

  // Define the SVG shape based on user's choice
  if (shape === 'circle') {
    svgShape = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
  } else if (shape === 'triangle') {
    svgShape = `
      <polygon points="150,20 245,180 55,180" fill="${shapeColor}" />
    `;
  } else if (shape === 'square') {
    svgShape = `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${svgShape}
      <text x="150" y="100" text-anchor="middle" alignment-baseline="middle" font-size="24" fill="${textColor}">${text}</text>
    </svg>
  `;

  // Create an HTML template with the SVG content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Logo</title>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;

  // Save the HTML content to a file named "logo.html"
  fs.writeFileSync('logo.html', htmlContent);

  console.log('Generated logo.html');
};

// Function to start the logo generation process
const startGenerator = async () => {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: (input) => {
        if (input.length <= 3) {
          return true;
        }
        return 'Text must be up to three characters long.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);

  // Generate the HTML file using user input
  generateHTML(userInput.text, userInput.textColor, userInput.shape, userInput.shapeColor);
};

// Start the logo generator
startGenerator();