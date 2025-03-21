/**
 * Export presentation to PDF
 * @param {Object} powerPointService - PowerPoint service instance
 * @param {Object} options - Command line options
 * @returns {Promise<void>}
 */
async function exportPdf(powerPointService, options) {
  try {
    const { file, outputPath } = options;
    
    console.log(`Exporting ${file} to PDF: ${outputPath}`);
    
    const result = await powerPointService.exportToPdf({
      file,
      outputPath
    });
    
    console.log(`Presentation exported to PDF successfully: ${result}`);
  } catch (error) {
    console.error('Error exporting to PDF:', error.message);
    throw error;
  }
}

module.exports = exportPdf; 