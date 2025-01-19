const createResponse = (res) => {
  res.send = (message, statusCode = 200) => {
    const isJson = typeof message === 'object';
    res.statusCode = statusCode;

    if (isJson) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(message));
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end(message);
    }
  };

  res.sendError = (errorMessage, statusCode = 500) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Error: ${errorMessage}`);
  };
};

module.exports = { createResponse };
