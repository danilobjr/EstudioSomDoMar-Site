var usuarioGerente = require('./usuarioGerente'),
    email = require('./../infra/email');

module.exports = function () {
    var enviarEmail = function (nomeRemetente, emailRemetente, mensagem) {
        var usuario = usuarioGerente.obterUsuario(); //{ email: 'danilobjr@gmail.com' };
        var assuntoMensagem = '[Estúdio Som do Mar - CONTATO]';

        var callback = function (erro, resultado) {
            if (erro) {
                throw new Error(erro);
            } else {
                return true;
            }
        };

        email.enviar(nomeRemetente, emailRemetente, usuario.email, assuntoMensagem, mensagem, callback);
    };

    return {
        enviarEmail: enviarEmail
    };
} ();