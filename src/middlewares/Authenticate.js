
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()
const isAuthenticated = async (req, res, next) => {
    try {
      const { userToken } = req.cookies;
      if (!userToken) return next("Anda Belum Login!");
  
      const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
      req.user = await prisma.user.findUnique({
        where: { email: decoded.email },
      });
      next();
    } catch (error) {
      return next(error);
    }
  };

  module.exports = {isAuthenticated};