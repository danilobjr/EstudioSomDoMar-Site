var radioGerente = require('./../app/gerentes/radioGerente');

exports.index = function (req, res) {
    var radio = radioGerente.obterPrograma();
    res.render('radioIndex', { viewModel: radio });
};

exports.alterar = function (req, res) {
    var idRadio = req.body.idRadio;
    var radioAlterada = {};
    var resultado = { sucesso: false, mensagem: '' };
    
    try {
        radioAlterada = {
            id: idRadio,
            descricao: req.body.descricao,
            arquivoMusica: req.body.arquivoMusica
        };
        
        radioAlterada = radioGerente.alterar(radioAlterada);

        resultado.sucesso = true;
        resultado.mensagem = 'Rádio alterada com sucesso';
    } catch (error) {
        radioAlterada = radioGerente.obterPrograma();
        resultado.mensagem = 'Erro ao alterar rádio: ' + error;
    }

    res.render('radioIndex', { viewModel: radioAlterada, resultado: resultado });
};