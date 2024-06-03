/* eslint-disable indent */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// parche para utilizar json
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// parche para utilizar json
const require = createRequire(import.meta.url);
export const readJSON = (dirr) => {
    return require(path.join(__dirname, dirr));
};

export function timestampCreate () {
    return Date.now();
}
