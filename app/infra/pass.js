var crypto = require('crypto');

exports.hash = function (password) {
    return crypto.createHash('sha256').update(password).digest('hex');
};