import { createInterface } from 'readline';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readline.on('line', (line) => {
    console.log(line.split('').reverse().join(''));
})
