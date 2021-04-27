# Social Share Card Generator

This plugin helps you to build automatic social share cards for your 11ty project. The underlying functionality is enabled by Cloudinary, a cloud based image management, optimisation and transformation solution.

## Preparation

To enable the social share card generator to function propertly a Cloudinary account is required. You can [register for free here](https://cloudinary.com/users/register/free), it takes less than 30 seconds. After registration please either [copy your `cloud-name`](https://cloudinary.com/documentation/how_to_integrate_cloudinary#account_details) or [update your `cloud-name`](https://cloudinary.com/documentation/how_to_integrate_cloudinary#optional_update_cloud_name_and_other_account_settings) and save it/remember it because you'll need it later.

## Setup

To install the plugin you need to run `npm i eleventy-plugin-social-share-card-generator`.

## Getting started

The plugin will enable you to create social share cards in an automated way by overlaying text on a pre-defined background image. That image needs to be [uploaded to Cloudinary](https://cloudinary.com/documentation/dam_upload_store_assets) first. The easiest way would be for you to login to your Cloudinary account, click the `Media Library` menu and drag your image for upload. If you don't have a suitable background ready, you'd need to create one. Should you not have access to a tool like Photoshop you can use [an online editor such as Pixlr](https://pixlr.com).

> If you'd like to learn how to create a social share background please consult [this article by Jason Lengstorf](https://www.learnwithjason.dev/blog/design-social-sharing-card)

> Note that ideally a social share base image should be 1200 x 630 pixels in size.

After uploading the file take a note of the [`public ID`](https://cloudinary.com/documentation/upload_images#public_id) (the unique identifier of the image in Cloudinary).

Once you have done these steps, you can add the plugin to your `.eleventy.js` configuration file, making sure to update the `YOUR-CLOUDINARY-USERNAME` and `YOUR-PUBLIC-ID` values.

```javascript
const socialShareCardGenerator = require('eleventy-plugin-social-share-card-generator/dist/lib');
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(socialShareCardGenerator, {
    cloudName: 'YOUR-CLOUDINARY-USERNAME',
    publicId: 'YOUR-PUBLIC-ID',
  });
};
```

It is recommended that you setup the `cloudName` and `publicId` when initialising the plugin. Additional defaults can be setup as well upon initialisation, details of these can be found below.

### Configuration

There are a vast number of options that you can configure using the plugin - some configuration options can be done from `.eleventy.js` and some from the template files. Find a list of possible configuration options below.

> Note that in the above table the `init` column refers to values that can be set via `.eleventy.js` while the `template` column refers to values that can be set from the templating language.

| Option                   | Set it via        | Default Value | init | template | data type | values                                                                                             |
| ------------------------ | ----------------- | ------------- | ---- | -------- | --------- | -------------------------------------------------------------------------------------------------- |
| Cloud Name               | `cloudName`       | no default    | X    | X        | `string`  | `any`                                                                                              |
| Public ID                | `publicId`        | no default    | X    | X        | `string`  | `any`                                                                                              |
| Font Colour              | `fontColour`      | eee           | X    | X        | `string`  | `any Hex value (without the # symbol)`                                                             |
| Font Face                | `fontFace`        | Roboto        | X    | X        | `string`  | `any Google Font`                                                                                  |
| Font Line Spacing        | `fontLineSpacing` | -10           | X    | X        | `number`  | `any`                                                                                              |
| Font Size                | `fontSize`        | 70            | X    | X        | `number`  | `any`                                                                                              |
| Font Weight              | `fontWeight`      | semibold      | X    | X        | `string`  | `any per Google Font`                                                                              |
| Text Position on Overlay | `position`        | west          | X    | X        | `string`  | `north_east`, `north`, `north_west`, `west`, `south_west`, `south`, `south_east`, `east`, `center` |
| Text Position on X axis  | `x`               |               | X    | X        | `number`  | `any`                                                                                              |
| Text Position on Y axis  | `y`               |               | X    | X        | `number`  | `any`                                                                                              |
| Overlay Text             | `overlayText`     | no default    |      | X        | `string`  | `any`                                                                                              |

> Note that the `overlayText` can only be set from the template.

###

#### A note on font support

Generally speaking, Cloudinary supports all of [Google's Fonts](https://support.cloudinary.com/hc/en-us/articles/203352832-What-is-the-list-of-supported-fonts-for-text-overlay-transformation-). However, there could be some fonts that are not supported - please make sure to test your social share card.

## Overlays

The options are created in a way that they can be overwritten after initalisation from the templating language as well (except for the `overlayText`).

## Template usage

Using Nunjucks, you can set the `overlayText` and assign the result from the social share card generator to a variable using the following code:

```twig
{% set img %}
{% sscg overlayText = "Hello there" %}
{% endset %}

<img src={{img}} alt="Social Share Card Test Preview" />
```

As you can see the plugin enables the usage of `sscg` in your template. Additional value can be set using `sscg`, which will overwrite your defaults created via the initialisation step in `.eleventy.js`, for example:

```twig
{% set img %}
{% sscg overlayText = "Hello there",
fontFace = 'Sacramento',
fontWeight = 'normal' %}
{% endset %}

<img src={{img}} alt="Social Share Card Test Preview" />
```

For best results, you can automate the creation of a social share card for your blog. This is possible via plugins for 11ty that generate `meta` elements, such as [`metagen`](https://www.npmjs.com/package/eleventy-plugin-metagen). Using the below strategy you will be able to take the title of your blogpost and inject that dynamically as an overlay to the social share card plugin.

```javascript
// .eleventy.js
const metagen = require('eleventy-plugin-metagen');
const socialShareCardGenerator = require('eleventy-plugin-social-share-card-generator/dist/lib');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(socialShareCardGenerator, {
    cloudName: 'YOUR-CLOUDINARY-USERNAME',
    publicId: 'YOUR-PUBLIC-ID',
  });
};
```

```twig
---
title: 'Hello World - this is my first article'
desc: 'Meta Description'
twitter: '@tpiros'
name: 'Tamas Piros'
---
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Test</title>
    {% set img %}
    {% sscg overlayText = title %}
    {% endset %}

    {% metagen name = name,
    title = title,
    desc = excerpt,
    twitter_card_type = "summary_large_image",
    url = page.url,
    twitterHandle = twitter,
    img = img %}
  </head>

  <body>
    {{ content | safe }}
  </body>
</html>
```

## Sample

Take a look at the `sample` folder for an example implementation. After running `npm i` in that folder, please go ahead and add your own Cloudinary username and the publicId of your base image (the background image). Once done, you can run `npx @11ty/eleventy --serve` to view the result in your browser.
