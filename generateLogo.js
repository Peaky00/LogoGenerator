const fs = require('fs');
const prompts = require('prompts');
const { SVG, G, Text, Rect } = require('@svgdotjs/svg.js');

async function generateLogo() {
  const userInput = await prompts([
    {
      type: 'text',
      name: 'text',
      message: 'Enter up to three characters for the text:'
    },
    {
      type: 'text',
      name: 'textColor',
      message: 'Enter text color (color keyword or hexadecimal):'
    },
    {
      type: 'select',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'text',
      name: 'shapeColor',
      message: 'Enter shape color (color keyword or hexadecimal):'
    }
  ]);

  const { text, textColor, shape, shapeColor } = userInput;

  // Create an SVG document
  const canvas = SVG().size(300, 200);

  // Create a group for the logo elements
  const group = canvas.group();

  // Draw the selected shape
  switch (shape) {
    case 'circle':
      group.circle(100).fill(shapeColor);
      break;
    case 'triangle':
      group.polygon('50,0 0,100 100,100').fill(shapeColor);
      break;
    case 'square':
      group.rect(100, 100).fill(shapeColor);
      break;
    default:
      console.log('Invalid shape selection.');
      return;
  }

  // Add the text to the logo
  const textElement = new Text().text(text).fill(textColor).move(100, 100).font({ size: 24 });

  // Append text to the group
  group.add(textElement);

  // Save the SVG to a file
  const svgString = canvas.svg();
  fs.writeFileSync('logo.svg', svgString);

  console.log('Generated logo.svg');
}

generateLogo();