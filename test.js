const sharp = require('sharp')

sharp('rainbow.png')
    .extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: 1,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile('rainb.png')
    .then(() => {
        console.log(`tada`)
    })