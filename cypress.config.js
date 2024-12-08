const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // Enable video recording
  videoCompression: 32, // Compress video (0 for no compression)
  videosFolder: 'cypress/videos', // Path to save videos
  videoUploadOnPasses: true, // Only keep videos for passed tests
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
