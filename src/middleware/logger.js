const logger = (req, res) => {
  const start = Date.now();

  // Log the request method and URL
  console.log(`[${new Date().toISOString()}] ${req.method} request made to: ${req.url}`);

  // Hook into the response's finish event to log the status code and response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${duration}ms`
    );
  });
};

module.exports = logger;
