const metagen = require('eleventy-plugin-metagen');
const socialShareCardGenerator = require('../dist/lib.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(socialShareCardGenerator, {
    cloudName: 'YOUR-CLOUDINARY-USERNAME',
    publicId: 'YOUR-PUBLIC-ID',
  });
};
