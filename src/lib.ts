import { UserConfig } from '@11ty/eleventy';
interface IOptions {
  cloudName?: string;
  publicId?: string;
  fontColour?: string;
  fontFace?: string;
  fontLineSpacing?: number;
  fontSize?: number;
  fontWeight?: number;
  position?: string;
  x?: number;
  y?: number;
  overlayText?: string;
}
module.exports = {
  configFunction: (eleventyConfig: UserConfig, defaults: IOptions = {}) => {
    const {
      fontColour = 'eee',
      fontFace = 'Roboto',
      fontLineSpacing = -10,
      fontSize = 70,
      fontWeight = 'semibold',
      position = 'west',
      x = 120,
      y = -60,
    } = defaults;

    Object.assign(defaults, {
      fontColour,
      fontFace,
      fontLineSpacing,
      fontSize,
      fontWeight,
      position,
      x,
      y,
    });

    eleventyConfig.addShortcode('sscg', ({ ...options }): string => {
      const values: IOptions = { ...defaults, ...options };
      const sanitiseText = escape(
        encodeURIComponent(<string>values.overlayText)
      );
      const url = `https://res.cloudinary.com/${
        values.cloudName
      }/image/upload/w_1200,h_630,c_fit,q_auto,f_auto/w_1000,c_fit,co_rgb:${
        values.fontColour
      },g_${values.position},x_${values.x},y_${values.y},l_text:${
        values.fontFace
      }_${values.fontSize}_line_spacing_${values.fontLineSpacing}${
        values.fontWeight ? `_${values.fontWeight}` : ``
      }:${sanitiseText}/${values.publicId}`;
      return url;
    });
  },
};
