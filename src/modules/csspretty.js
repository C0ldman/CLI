const Comb = require('csscomb');

export async function prettify(path) {
    const comb = new Comb('zen');
    comb.processPath(path);
}
