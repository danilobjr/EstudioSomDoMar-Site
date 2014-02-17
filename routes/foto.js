var fotoGerente = require('./../app/gerentes/fotoGerente');

exports.index = function (req, res) {
    var fotos = {};
    fotos.home = fotoGerente.obterPorSecao('home');
    fotos.estudio = fotoGerente.obterPorSecao('estudio');
    fotos.musicos = fotoGerente.obterPorSecao('musico');
    fotos.participacoes = fotoGerente.obterPorSecao('participacao');
    
    res.render('fotoIndex', { viewModel: fotos });
};

exports.nova = function (req, res) {
    res.render('fotoNova');
};

exports.incluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        var novaFoto = {
            titulo: req.body.titulo,
            secao: req.body.secao,
            imagemPequena: req.body.imagemPequena,
            imagemAmpliada: req.body.imagemAmpliada
        };

        fotoGerente.incluir(novaFoto);
        resultado.sucesso = true;
        resultado.mensagem = 'Foto incluída com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao incluir foto: ' + error;
    }

    var fotos = {};
    fotos.home = fotoGerente.obterPorSecao('home');
    fotos.estudio = fotoGerente.obterPorSecao('estudio');
    fotos.musicos = fotoGerente.obterPorSecao('musico');
    fotos.participacoes = fotoGerente.obterPorSecao('participacao');

    res.render('fotoIndex', { viewModel: fotos, resultado: resultado });
};

exports.editar = function (req, res) {
    var idFoto = req.params.id;
    var foto = fotoGerente.obterPorId(idFoto);
    res.render('fotoAlteracao', { viewModel: foto });
};

exports.alterar = function (req, res) {
    var idFoto = req.body.idFoto;
    var resultado = { sucesso: false, mensagem: '' };

    try {
        var fotoAlterada = {
            id: idFoto,
            titulo: req.body.titulo,
            imagemPequena: req.body.imagemPequena,
            imagemAmpliada: req.body.imagemAmpliada
        };

        console.log(fotoAlterada);

        fotoGerente.alterar(fotoAlterada);
        resultado.sucesso = true;
        resultado.mensagem = 'Foto alterada com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar foto: ' + error;
    }

    var foto = fotoGerente.obterPorId(idFoto);

    res.render('fotoAlteracao', { viewModel: foto, resultado: resultado });
};

exports.excluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        fotoGerente.excluirPorId(req.params.id);

        resultado.sucesso = true;
        resultado.mensagem = 'Foto excluída com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao excluir foto: ' + error;
    }

    var fotos = {};
    fotos.home = fotoGerente.obterPorSecao('home');
    fotos.estudio = fotoGerente.obterPorSecao('estudio');
    fotos.musicos = fotoGerente.obterPorSecao('musico');
    fotos.participacoes = fotoGerente.obterPorSecao('participacao');

    res.render('fotoIndex', { viewModel: fotos, resultado: resultado });
};