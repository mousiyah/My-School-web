const authService = require('../services/authService');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  authService.verifyAccessToken(token)
    .then(async userId => {
      req.userId = userId;
      req.userRole = await authService.getUserRole(userId);

      next();
    })
    .catch(error => {
      console.log('Error verifying access token:', error);
      res.status(403).json({ error: error.message });
    });
};

module.exports = {
  authenticateToken,
};
