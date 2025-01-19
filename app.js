const ConvertJs = require('./src/index'); // Import your framework
const { createResponse } = require('./src/utils/helpers'); // Import helpers
const logger = require('./src/middleware/logger'); // Import logger middleware

// Create a new instance of the framework
const app = new ConvertJs();

// Use the logger middleware
app.use(logger);

// Define a GET route for the root
app.get('/', (req, res) => {
  createResponse(res); // Extend response with utility methods
  res.send('Hello, welcome to ConvertJs!');
});

// Define a GET route for JSON response
app.get('/api/data', (req, res) => {
  createResponse(res);
  res.send({ message: 'This is a JSON response', status: 'success' });
});

// Define a POST route for handling data
app.post('/api/data', (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    createResponse(res);
    try {
        // Attempt to parse the JSON body
        const parsedBody = JSON.parse(body);
        console.log("parsed body:",parsedBody);
  
        // Send the parsed data back as JSON
        res.send({ received: parsedBody, status: 'success' });
      } catch (error) {
        // Handle invalid JSON
        res.sendError('Invalid JSON format', 400);
      }
    res.send({ received: body, status: 'success' });
  });
});

//define a route for testing  the query parameter handling
app.get('/search', (req, res) => {
    createResponse(res);
    res.send(`Received query parameters: ${JSON.stringify(req.query)}`);

    // res.send({ query: req.query });
  });

// Define a route for testing error handling
app.get('/error', (req, res) => {
  createResponse(res);
  res.sendError('Something went wrong!', 500);
});

// Start the server
app.listen(3000, () => {
  console.log('App is running at http://localhost:3000');
});
