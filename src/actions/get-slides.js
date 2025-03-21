/**
 * Get slides from a presentation
 * @param {Object} powerPointService - PowerPoint service instance
 * @param {Object} options - Command line options
 * @returns {Promise<void>}
 */
async function getSlides(powerPointService, options) {
  try {
    const { file } = options;
    
    console.log(`Getting slides from: ${file}`);
    
    const slides = await powerPointService.getSlides({
      file
    });
    
    console.log('Slides:');
    console.log(JSON.stringify(slides, null, 2));
  } catch (error) {
    console.error('Error getting slides:', error.message);
    throw error;
  }
}

module.exports = getSlides; 