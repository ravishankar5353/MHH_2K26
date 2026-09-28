const { spawn } = require('child_process');
const path = require('path');

console.log('\n\x1b[36m%s\x1b[0m', '================================================');
console.log('\x1b[1m\x1b[35m%s\x1b[0m', '  🧠 DEALMIND — Persistent Memory Sales Agent');
console.log('\x1b[36m%s\x1b[0m', '================================================');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', 'DealMind Frontend:  http://localhost:3000');
console.log('\x1b[34m%s\x1b[0m', 'DealMind Backend:   http://localhost:8000');
console.log('\x1b[33m%s\x1b[0m', 'DealMind API Docs:  http://localhost:8000/docs');
console.log('\x1b[36m%s\x1b[0m', '================================================\n');

// Start FastAPI Backend on port 8000
const backend = spawn('python', ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start Next.js Frontend on port 3000
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
