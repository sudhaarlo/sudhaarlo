const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
let token;
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
token = req.headers.authorization.split(' ')[1];
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: decoded.id };
return next();
} catch (err) {
console.error(err);
return res.status(401).json({ message: 'Not authorized, token failed' });
}
}


if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};


module.exports = protect;