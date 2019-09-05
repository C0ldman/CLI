const sharp = require('sharp'),
    cheerio = require('cheerio');
// import * as create from './src/create/create.js'
import * as get from 'src/getInfo.js';
// import { write } from 'src/write.js';
// import { isOdd, compress } from 'src/utils.js';

// sharp('PrepPill.png')
//     .resize({ width: 940, height: 502 })
//     .toFile('output.png')

//     .then(data => {
//         console.log(data)
//     });

// sharp('PrepPill.png')
//     .resize({ width: 940, height: 502 })
//     .toFile('PrepPill.png');
let id = 'titleSlide';
process.chdir('/home/yuriy/Documents/Projects/presentations/prep/');
const $ = cheerio.load(get.getSlideContent(id)),
    stylesFile = `./app/styles/${id}.css`,
    modelFile = `./app/data/models/${id}.json`,
    htmlFile = `./app/${id}.html`,
    language = JSON.parse(fs.readFileSync("./app/settings/app.json")).lang,
    localizationFile = `./app/i18n/${language}/${id}.json`;
let tags = cheerio.load($('article').html());
console.log(tags);