const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'cambia_este_secreto';
const EXPIRES = process.env.JWT_EXPIRES || '2h';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}
module.exports = { signToken };
