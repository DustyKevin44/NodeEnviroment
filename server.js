const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Worlds this is not cool');
});

server.listen(port, hostname, () => {
    console.log(`V8 version: ${process.versions.v8}`);

  console.log(`Server running at http://${hostname}:${port}/`);
const v8 = require('v8');
const heapStats = v8.getHeapStatistics();

console.log('Heap size limit:', (heapStats.heap_size_limit / 1024 / 1024).toFixed(2), 'MB');
console.log('Total heap size:', (heapStats.total_heap_size / 1024 / 1024).toFixed(2), 'MB');
console.log('Used heap size:', (heapStats.used_heap_size / 1024 / 1024).toFixed(2), 'MB');
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
});

