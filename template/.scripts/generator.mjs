import fs from 'fs';

const args = process.argv.slice(2);

// Check to see if the user has provided a type and a name
if (args.length === 0) {
  logError('You need to provide a type and a name');

  process.exit(1);
}

switch (args[0]) {
  case '--help':
    log('Usage: generator [type] [name]');
    log('  component: Create a new component');
    log('  css: Create a new CSS module');
    log('  story: Create a new story');
    log('  test: Create a new test');
    break;
  case 'component':
    createComponent(args[1]);
    break;
  case 'css':
    createCssModule(args[1]);
    break;
  case 'story':
    if (args.length !== 3) {
      logError('You need to provide a story name and title of your story');

      process.exit(1);
    } else {
      createStory(args[1], args[2]);
    }

    break;
  case 'test':
    createTest(args[1]);
    break;
  default:
    logError('Something went wrong, try passing in --help to check commands');

    process.exit(1);
}

/**
 * This is used to generate a new functional component in react
 *
 * @param {string} name - The name of the component
 */
function createComponent(name) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  const componentDir = `./src/components/${componentName}`;
  const componentFile = `${componentDir}/index.tsx`;
  const componentTemplate = `import { ReactElement } from 'react';

export const ${componentName} = (): ReactElement => {
  return <div data-testid="${componentName}">${componentName}</div>;
};

`;

  if (!fileExists(componentFile)) {
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(componentFile, componentTemplate);

    logSuccess(`Component ${componentName} created`);
  } else {
    logWarning(`Component ${componentName} already exists`);
  }
}

/**
 * This is used to generage a new CSS module in react
 *
 * @param {string} name - The name of the css module
 */
function createCssModule(name) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  const componentDir = `./src/components/${componentName}`;
  const cssModuleFile = `${componentDir}/${componentName}.module.scss`;
  const cssModuleTemplate = `.${componentName} {
  color: #000;
}

`;

  if (!fileExists(cssModuleFile)) {
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(cssModuleFile, cssModuleTemplate);

    logSuccess(`CSS module ${componentName} created`);
  } else {
    logWarning(`CSS module ${componentName} already exists`);
  }
}

/**
 * This is used to generate a new test for your component
 *
 * @param {string} name The name of the test
 */
function createTest(name) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  const componentDir = `./src/components/${componentName}`;
  const testFile = `${componentDir}/${componentName}.test.tsx`;
  const testTemplate = `import { render, screen } from '@testing-library/react';

import { ${componentName} } from '.';

describe('${componentName}', () => {
  it('should render correctly', () => {
    render(<${componentName} />);

    expect(screen.getByTestId('${componentName}')).toBeInTheDocument();
  });
});
`;

  if (!fileExists(testFile)) {
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(testFile, testTemplate);

    logSuccess(`Test ${componentName} created`);
  } else {
    logWarning(`Test ${componentName} already exists`);
  }
}

/**
 * This is used to generate a new story file for your component
 *
 * @param {string} name - The name of the test
 * @param {string} title - Grouping name for your story
 */
function createStory(name, title) {
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  const componentDir = `./src/components/${componentName}`;
  const storyFile = `${componentDir}/${componentName}.stories.tsx`;
  const storyTemplate = `import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ${componentName} } from '.';

export default {
  title: '${title}',
  component: ${componentName},
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args: typeof ${componentName}) => <${componentName} {...args} />;

export const Default = Template.bind({});

Default.args = {};

`;

  if (!fileExists(storyFile)) {
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(storyFile, storyTemplate);

    logSuccess(`Story ${componentName} created`);
  } else {
    logWarning(`Story ${componentName} already exists`);
  }
}

/**
 * Checks to see if the file already exists
 *
 * @param {string} filePath - The file name you want to check
 * @returns boolean
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Logs your success message
 *
 * @param {string} message - text you want to log
 */
function logSuccess(message) {
  log(`\x1b[32m${message}\x1b[0m`);
}

/**
 * Logs your error message
 *
 * @param {string} message - text you want to log
 */
function logError(message) {
  log(`\x1b[31m${message}\x1b[0m`);
}

/**
 * Logs your warning message
 *
 * @param {string} message - text you want to log
 */
function logWarning(message) {
  log(`\x1b[33m${message}\x1b[0m`);
}

/**
 * Logs your message
 *
 * @param {string} message - text you want to log
 */
function log(message) {
  console.log(message);
}
