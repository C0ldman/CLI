const Comb = require('csscomb');
     
export function prettify(path) {
    const comb = new Comb('zen');
    comb.processPath(path);
}