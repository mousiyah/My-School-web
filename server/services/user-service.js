const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');

module.exports = {
  userWithEmailExists,
  loginUser,
};


async function getUserByEmail(email) {
  try {
    const user = await db.user.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function userWithEmailExists(email) {
    const user = await getUser(email);
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
    return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
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