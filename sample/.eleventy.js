const metagen = require('eleventy-plugin-metagen');
const socialShareCardGenerator = require('../dist/lib.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(socialShareCardGenerator, {
    cloudName: 'your-cloud-name',
    publicId: 'your-public-id',
    fontSize: 80, // optional, defaults to 70 px
  });
};
