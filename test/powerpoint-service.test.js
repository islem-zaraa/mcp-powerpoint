const path = require('path');
const fs = require('fs-extra');
const PowerPointService = require('../src/powerpoint-service');

// Create temporary test directory
const TEST_DIR = path.join(__dirname, 'temp');
fs.ensureDirSync(TEST_DIR);

describe('PowerPointService', () => {
  let powerPointService;
  let testPresentationPath;
  
  beforeEach(() => {
    powerPointService = new PowerPointService();
    testPresentationPath = path.join(TEST_DIR, 'test-presentation.pptx');
  });
  
  afterAll(async () => {
    // Clean up test directory
    await fs.remove(TEST_DIR);
  });
  
  test('should create a new presentation', async () => {
    const result = await powerPointService.createPresentation({
      outputPath: testPresentationPath,
      title: 'Test Presentation'
    });
    
    expect(result).toBe(testPresentationPath);
    expect(fs.existsSync(testPresentationPath)).toBe(true);
  });
  
  test('should add a slide to a presentation', async () => {
    // First create a presentation
    await powerPointService.createPresentation({
      outputPath: testPresentationPath,
      title: 'Test Presentation'
    });
    
    const result = await powerPointService.addSlide({
      file: testPresentationPath,
      title: 'Test Slide',
      content: 'This is a test slide content.'
    });
    
    expect(result).toBe(true);
  });
  
  test('should get slides from a presentation', async () => {
    // First create a presentation
    await powerPointService.createPresentation({
      outputPath: testPresentationPath,
      title: 'Test Presentation'
    });
    
    const slides = await powerPointService.getSlides({
      file: testPresentationPath
    });
    
    expect(Array.isArray(slides)).toBe(true);
  });
  
  test('should export presentation to PDF', async () => {
    // First create a presentation
    await powerPointService.createPresentation({
      outputPath: testPresentationPath,
      title: 'Test Presentation'
    });
    
    const pdfPath = path.join(TEST_DIR, 'test-presentation.pdf');
    const result = await powerPointService.exportToPdf({
      file: testPresentationPath,
      outputPath: pdfPath
    });
    
    expect(result).toBe(pdfPath);
    expect(fs.existsSync(pdfPath)).toBe(true);
  });
  
  test('should read presentation metadata', async () => {
    // First create a presentation
    await powerPointService.createPresentation({
      outputPath: testPresentationPath,
      title: 'Test Presentation'
    });
    
    const presentation = await powerPointService.readPresentation({
      file: testPresentationPath
    });
    
    expect(presentation).toHaveProperty('title');
    expect(presentation).toHaveProperty('slides');
    expect(Array.isArray(presentation.slides)).toBe(true);
  });
});
