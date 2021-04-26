"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    configFunction: (eleventyConfig, defaults = {}) => {
        const { fontColour = 'eee', fontFace = 'Roboto', fontLineSpacing = -10, fontSize = 70, fontWeight = 'semibold', position = 'west', x = 120, y = -60, } = defaults;
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
        eleventyConfig.addShortcode('sscg', ({ ...options }) => {
            const values = { ...defaults, ...options };
            const sanitiseText = escape(encodeURIComponent(values.overlayText));
            const url = `https://res.cloudinary.com/${values.cloudName}/image/upload/w_1200,h_630,c_fit,q_auto,f_auto/w_1000,c_fit,co_rgb:${values.fontColour},g_${values.position},x_${values.x},y_${values.y},l_text:${values.fontFace}_${values.fontSize}_line_spacing_${values.fontLineSpacing}${values.fontWeight ? `_${values.fontWeight}` : ``}:${sanitiseText}/${values.publicId}`;
            return url;
        });
    },
};
