const url = require('url');


class ConvertJs {
  constructor() {
      this.routes = [];
      this.middleware = [];
  }

  use(mw) {
      this.middleware.push(mw);
  }

  get(path, handler) {
      this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
      this.routes.push({ method: 'POST', path, handler });
  }

  listen(port, callback) {
      const http = require('http');
      const { createResponse } = require('./utils/helpers');

      const server = http.createServer((req, res) => {
      
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);     
        req.query = Object.fromEntries(parsedUrl.searchParams.entries());

          // Apply middleware
          this.middleware.forEach((mw) => mw(req, res));

          // Extend response
          createResponse(res);

          // Route matching
          const route = this.routes.find(
              (r) => r.method === req.method && r.path === req.url
          );

          if (route) {
              route.handler(req, res);
          } else {
              res.statusCode = 404;
              res.send('Route not found');
          }
      });

      server.listen(port, callback);
  }
}

module.exports = ConvertJs; // Ensure it is exported as the class





// // src/index.js
// const http = require('http');
// const Router = require('./router');
// const middleware = require('./middleware/logger');


// // Helper to add `res.send` method
// const createResponse = (res) => {
//   res.send = (message) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(message);
//   };
// };

// class ConvertJs {
//   constructor() {
//     this.routes = [];
//     this.middleware = [];
//   }

//   // Use middleware globally
//   use(mw) {
//     this.middleware.push(mw);
//   }

//   // Define a route for GET method
//   get(path, handler) {
//     this.routes.push({ method: 'GET', path, handler });
//   }

//   // Define a route for POST method
//   post(path, handler) {
//     this.routes.push({ method: 'POST', path, handler });
//   }

//   // Listen on a port
//   listen(port, callback) {
//     const server = http.createServer((req, res) => {
//       let matchedRoute = null;

//       // Apply middleware
//       for (let mw of this.middleware) {
//         mw(req, res);
//       }

//        // Extend the response object with `res.send`
//        createResponse(res);

//       // Handle routing
//       for (let route of this.routes) {
//         if (req.method === route.method && req.url === route.path) {
//           matchedRoute = route;
//           route.handler(req, res);
//           break;
//         }
//       }

//       // If no route matched, send 404
//       if (!matchedRoute) {
//         res.statusCode = 404;
//         res.end('Route not found');
//       }
//     });

//     server.listen(port, callback);
//   }
// }

// module.exports = ConvertJs;
