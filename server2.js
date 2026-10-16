const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});

for(i=0; i<5; i++){
const promise1 = new Promise(resolve => setTimeout(() => resolve('First result'),  Math.random()));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second result'), Math.random()));
const promise3 = new Promise(resolve => setTimeout(() => resolve('Third result'), Math.random()));

Promise.race([promise1, promise2])
  .then(result => {
    console.log('Fastest result:', result);
    // Will log 'Second result' because promise2 is faster
  });
}