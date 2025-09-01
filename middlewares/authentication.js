
const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      req.user = undefined;
    }
    next();
  };
}

function requireAuth(req, res, next) {
  if (!req.user) {
    // If AJAX, send 401, else redirect
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(401).json({ message: "Authentication required" });
    }
    return res.redirect("/user/signin");
  }
  next();
}

module.exports = {
  checkForAuthenticationCookie,
  requireAuth,
};
