const Comb = require('csscomb');

export async function prettifyCSS(path) {
    const comb = new Comb('zen');
    comb.processPath(path);
}
