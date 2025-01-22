// middleware/bodyParser.js

function bodyParser(req, res, next) {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let body = '';
  
      // Collect data chunks
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      // Process the complete body
      req.on('end', () => {
        // Parse the URL-encoded data
        const parsedBody = new URLSearchParams(body);
        req.body = Object.fromEntries(parsedBody.entries());
        next();
      });
    } else {
      // If not a POST request or incorrect content-type, proceed without parsing
      next();
    }
  }
  
  module.exports = bodyParser;
  