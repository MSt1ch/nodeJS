import csv from 'csvtojson';
import { createReadStream, createWriteStream, writeFile } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// 1.2 fully loaded into the RAM

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname, 'files/nodejs-hw1-ex1.csv');

const jsonArray = await csv().fromFile(filePath);

writeFile('files/hw1-fully-loaded-into-the-ram.txt', `${JSON.stringify(jsonArray)}`, (err) => {
    if (err) console.log(err);
})

// 1.3 using streams

const readStream = createReadStream(filePath);
const writeStream = createWriteStream('files/hw1-using-streams.txt', 'utf8');

readStream
    .pipe(csv())
    .on('error', error => console.log(error.message))
    .pipe(writeStream)
    .on('error', error => console.log(error.message));