const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');

module.exports = {
  userWithEmailExists,
  loginUser,
  verifyAccessToken,
  getUserEmail,
};

async function userWithEmailExists(email) {
    const user = await getUserByEmail(email);
    return !!user;
}

async function loginUser(email, password) {

  const user = await getUserByEmail(email);
  const userId = user.id;

  if (!user) {
    throw new Error('User with this email does not exist');
  }

  const passwordMatch = await validatePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Wrong password. Please try again.');
  }

  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  return { accessToken, refreshToken };
}

function verifyAccessToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded.userId);
    });
  });
};

async function getUserEmail(userId) {
  const user = await getUserById(userId);
  return user.email;
}

async function getUserByEmail(email) {
  try {
    const user = await db.user.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function getUserById(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function validatePassword(password, userPassword) {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch {
    console.error('Bcrypt failed:', error);
    throw new Error('Internal server error');
  }
}

function generateAccessToken(userId) {
  try {
    return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Internal server error');
  }
}

function generateRefreshToken(userId) {
  try {
    return jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Internal server error');
  }
}