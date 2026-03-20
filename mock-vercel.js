const os = require('os');
os.hostname = () => 'PC';
process.argv = [process.argv[0], require.resolve('vercel/dist/index.js'), ...process.argv.slice(2)];
require('vercel/dist/index.js');
