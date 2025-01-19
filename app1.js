// app.js
const ConvertJs = require('./src');
const logger = require('./src/middleware/logger');

const app = new ConvertJs();

// Apply global middleware
app.use(logger);

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/submit', (req, res) => {
  res.send('Form submitted!');
});

// Define a route for testing error handling
app.get('/error', (req, res) => {
  createResponse(res);
  res.sendError('Something went wrong!', 500);
});

app.post('/api/data', (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  })});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
