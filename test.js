const sharp = require('sharp')

sharp('rainbow.png')
    .resize({ width: 940, height: 502 })
    .toFile('rainbow2.png');