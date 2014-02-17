var contatoGerente = require('./../app/gerentes/contatoGerente');

exports.enviarEmail = function (req, res) {

    var resultado = { sucesso: false, mensagem: '' };

    try {
        contatoGerente.enviarEmail(req.body.nome, req.body.email, req.body.mensagem);
        resultado.sucesso = true;
        resultado.mensagem = 'Email enviado com sucesso';
    } catch (erro) {
        resultado.mensagem = 'Erro ao enviar email: ' + erro;
    }

    res.send(resultado);
};