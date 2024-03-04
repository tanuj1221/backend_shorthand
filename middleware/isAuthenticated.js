
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      // You can redirect to a login page or return a 403 Forbidden response
      // For example, redirect to login: res.redirect('/login');
      res.status(403).send('Not authenticated');
    }
  };
  
  module.exports = isAuthenticated;
  