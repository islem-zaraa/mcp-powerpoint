#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs-extra');
const path = require('path');
const PowerPointService = require('./powerpoint-service');

// Import actions
const createPresentation = require('./actions/create-presentation');
const addSlide = require('./actions/add-slide');
const getSlides = require('./actions/get-slides');
const exportPdf = require('./actions/export-pdf');
const readPresentation = require('./actions/read-presentation');

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .command('create', 'Create a new PowerPoint presentation', (yargs) => {
    return yargs
      .option('outputPath', {
        alias: 'o',
        type: 'string',
        description: 'Output path for the presentation',
        demandOption: true
      })
      .option('title', {
        alias: 't',
        type: 'string',
        description: 'Title of the presentation'
      });
  })
  .command('add-slide', 'Add a slide to an existing presentation', (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Path to the PowerPoint file',
        demandOption: true
      })
      .option('title', {
        alias: 't',
        type: 'string',
        description: 'Title of the slide'
      })
      .option('content', {
        alias: 'c',
        type: 'string',
        description: 'Content of the slide'
      });
  })
  .command('get-slides', 'Get slides from a presentation', (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Path to the PowerPoint file',
        demandOption: true
      });
  })
  .command('export-pdf', 'Export presentation to PDF', (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Path to the PowerPoint file',
        demandOption: true
      })
      .option('outputPath', {
        alias: 'o',
        type: 'string',
        description: 'Output path for the PDF',
        demandOption: true
      });
  })
  .command('read', 'Read a PowerPoint presentation', (yargs) => {
    return yargs
      .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Path to the PowerPoint file',
        demandOption: true
      });
  })
  .demandCommand(1, 'You need to specify a command')
  .help()
  .alias('help', 'h')
  .argv;

// Process the command
const command = argv._[0];

(async () => {
  try {
    const powerPointService = new PowerPointService();
    
    switch (command) {
      case 'create':
        await createPresentation(powerPointService, argv);
        break;
      case 'add-slide':
        await addSlide(powerPointService, argv);
        break;
      case 'get-slides':
        await getSlides(powerPointService, argv);
        break;
      case 'export-pdf':
        await exportPdf(powerPointService, argv);
        break;
      case 'read':
        await readPresentation(powerPointService, argv);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})(); 