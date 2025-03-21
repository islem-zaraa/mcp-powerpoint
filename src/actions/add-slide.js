/**
 * Add a slide to an existing presentation
 * @param {Object} powerPointService - PowerPoint service instance
 * @param {Object} options - Command line options
 * @returns {Promise<void>}
 */
async function addSlide(powerPointService, options) {
  try {
    const { file, title, content } = options;
    
    console.log(`Adding slide to: ${file}`);
    
    const result = await powerPointService.addSlide({
      file,
      title,
      content
    });
    
    console.log('Slide added successfully');
  } catch (error) {
    console.error('Error adding slide:', error.message);
    throw error;
  }
}

module.exports = addSlide; 