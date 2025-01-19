class Router {
  constructor() {
    this.routes = [];
  }

  // Define a route for GET method
  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  // Define a route for POST method
  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  // Match the incoming request to a registered route
  matchRoute(method, url) {
    return this.routes.find((route) => route.method === method && route.path === url);
  }

  // Handle the incoming request
  handleRequest(req, res) {
    const { method, url } = req;
    const route = this.matchRoute(method, url);

    if (route) {
      route.handler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Route not found');
    }
  }
}

module.exports = Router;
