/**
 * Read a PowerPoint presentation
 * @param {Object} powerPointService - PowerPoint service instance
 * @param {Object} options - Command line options
 * @returns {Promise<void>}
 */
async function readPresentation(powerPointService, options) {
  try {
    const { file } = options;
    
    console.log(`Reading presentation: ${file}`);
    
    const presentation = await powerPointService.readPresentation({
      file
    });
    
    console.log('Presentation details:');
    console.log(JSON.stringify(presentation, null, 2));
  } catch (error) {
    console.error('Error reading presentation:', error.message);
    throw error;
  }
}

module.exports = readPresentation; 