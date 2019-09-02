const sharp = require('sharp');


sharp('PrepPill.png')
    .resize({ width: 940, height: 502 })
    .toFile('output.png')

    .then(data => {
        console.log(data)
    });

sharp('PrepPill.png')
    .resize({ width: 940, height: 502 })
    .toFile('PrepPill.png');