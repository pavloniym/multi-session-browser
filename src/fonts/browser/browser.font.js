const path = require('path');

const fontName = 'BrowserIcons';
const fontTemplate = './browser.css.hbs';
const fontSVGFolder = path.join(__dirname, '.', 'sources');

module.exports = {

    files: [`${fontSVGFolder}/**/*.svg`],
    fontName: fontName.toLowerCase(),
    classPrefix: 'b-',
    baseSelector: '.b',
    types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
    fixedWidth: true,
    embed: false,
    cssTemplate: fontTemplate,
    formatOptions: {
        svg: {
            centerHorizontally: true,
            normalize: true,
            metadata: 'Pavel Sharypov'
        }
    },

    /*
     * Rename icons
     * Use folder in names like [folder]-[folder]-[filename]
     */
    rename: function(name){

        console.log(name);

        let basepath = name;
        let folder = basepath.slice(basepath.indexOf(fontName) + fontName.length + 1);
        return folder.split('/').join('-').replace(/\.[^/.]+$/, "");
    }
};
