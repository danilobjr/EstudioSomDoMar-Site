exports.autenticacaoRequerida = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Autenticação Requerida.';
        console.log(req.session.error);
        res.redirect('/login');
    }
};