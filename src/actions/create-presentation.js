/**
 * Create a new PowerPoint presentation
 * @param {Object} powerPointService - PowerPoint service instance
 * @param {Object} options - Command line options
 * @returns {Promise<void>}
 */
async function createPresentation(powerPointService, options) {
  try {
    const { outputPath, title } = options;
    
    console.log(`Creating presentation: ${title || 'New Presentation'}`);
    
    const result = await powerPointService.createPresentation({
      outputPath,
      title
    });
    
    console.log(`Presentation created successfully: ${result}`);
  } catch (error) {
    console.error('Error creating presentation:', error.message);
    throw error;
  }
}

module.exports = createPresentation; 