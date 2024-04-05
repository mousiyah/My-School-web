const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');

module.exports = {
  userExists,
  loginUser,
};

async function getUser(email) {
  try {
    const user = await db.user.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error('Internal server error');
  }
}

async function userExists(email) {
    const user = await getUser(email);
    return !!user;
}

async function loginUser(email, password) {

  const user = await getUser(email);

  if (!user) {
    throw new Error('User with this email does not exist');
  }

  const passwordMatch = await validatePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Wrong password. Please try again.');
  }

  const accessToken = generateAccessToken(email);
  const refreshToken = generateRefreshToken(email);

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

function generateAccessToken(email) {
  try {
    return jwt.sign({ userEmail: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Internal server error');
  }
}

function generateRefreshToken(email) {
  try {
    return jwt.sign({ userEmail: email }, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Internal server error');
  }
}