const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // This line ensures we avoid CORS issues while running dev locally
    // React app runs on port 3000. The Express API runs on port 5000.
    // Hence, we need the React app's requests to be rerouted to http://localhost:5000/*
    app.use(proxy(['/api'], { target: 'http://localhost:5000' }));
};
