const inquirer = require('inquirer');
const SVG = require('svg.js');

// Function to generate an SVG logo
const generateLogo = async (text, textColor, shape, shapeColor) => {
  // Create an SVG.js instance
  const canvas = SVG().size(300, 200);

  // Draw the selected shape with the specified color
  let drawnShape;
  if (shape === 'circle') {
    drawnShape = canvas.circle(100).center(150, 100);
  } else if (shape === 'triangle') {
    drawnShape = canvas.polygon('150,18 244,182 56,182');
  } else if (shape === 'square') {
    drawnShape = canvas.rect(100, 100).center(150, 100);
  }

  drawnShape.fill(shapeColor);

  // Add the text with the specified color
  canvas.text(text).font({ size: 24 }).fill(textColor).center(150, 100);

  // Export the SVG as a string
  const svgString = canvas.svg();

  // Save the SVG to a file named "logo.svg"
  require('fs').writeFileSync('logo.svg', svgString);

  console.log('Generated logo.svg');
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

  // Generate the logo using user input
  generateLogo(userInput.text, userInput.textColor, userInput.shape, userInput.shapeColor);
};

// Start the logo generator
startGenerator();
