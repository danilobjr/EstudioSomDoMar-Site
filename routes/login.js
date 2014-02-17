var loginGerente = require('./../app/gerentes/loginGerente');

exports.index = function (req, res) {
    res.render('loginIndex', { _layoutFile: false });
};

exports.logon = function (req, res) {
    loginGerente.autenticar('anfrisiorocha@hotmail.com', req.body.senha, function (erro, usuario) {
        if (usuario) {
            console.log('## SESSION: Autenticado como ' + usuario.nome);
            req.session.regenerate(function () {
                req.session.user = usuario;
                req.session.success = 'Autenticado como ' + usuario.nome;
                res.redirect('/admin');
            });
        } else {
            req.session.error = 'Autenticação falhou, por favor cheque seu nome de usuário e senha.';
            res.redirect('/login?error=1');
        }
    });
};

exports.logoff = function (req, res) {
    req.session.destroy(function () {
        console.log('## SESSION: Usuário efetuou logout.');
        res.redirect('/login');
    });
};