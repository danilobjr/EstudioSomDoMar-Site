var portfolioGerente = require('./../app/gerentes/portfolioGerente');

exports.index = function (req, res) {
    var portfolio = portfolioGerente.obterTodasAsMusicas();
    res.render('portfolioIndex', { viewModel: portfolio });
};

exports.novo = function (req, res) {
    res.render('portfolioNovo');
};

exports.incluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        var novaMusica = {
            nome: req.body.nome,
            artista: req.body.artista,
            arquivoMusica: req.body.arquivoMusica,
            arquivoCapaAlbum: req.body.arquivoCapaAlbum[0] || req.body.arquivoCapaAlbum[1],
            secao: req.body.secao
        };

        portfolioGerente.incluir(novaMusica);

        resultado.sucesso = true;
        resultado.mensagem = 'Música incluída com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao incluir música: ' + error;
    }

    var portfolio = portfolioGerente.obterTodasAsMusicas();

    res.render('portfolioIndex', { viewModel: portfolio, resultado: resultado });
};

exports.editar = function (req, res) {
    var idMusica = req.params.id;
    var musica = portfolioGerente.obterPorId(idMusica);

    res.render('portfolioAlteracao', { viewModel: musica });
};

exports.alterar = function (req, res) {
    var idMusica = req.body.idMusica;
    var musicaAlterada = {};
    var resultado = { sucesso: false, mensagem: '' };
    
    try {
        musicaAlterada = {
            id: idMusica,
            nome: req.body.nome,
            artista: req.body.artista,
            arquivoMusica: req.body.arquivoMusica,
            arquivoCapaAlbum: req.body.arquivoCapaAlbum
        };
        
        musicaAlterada = portfolioGerente.alterar(musicaAlterada);

        resultado.sucesso = true;
        resultado.mensagem = 'Música alterada com sucesso';
    } catch (error) {
        musicaAlterada = portfolioGerente.obterPorId(idMusica);
        resultado.mensagem = 'Erro ao alterar música: ' + error;
    }

    res.render('portfolioAlteracao', { viewModel: musicaAlterada, resultado: resultado });
};

exports.excluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        portfolioGerente.excluirPorId(req.params.id);

        resultado.sucesso = true;
        resultado.mensagem = 'Música excluída com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao excluir música: ' + error;
    }

    var portfolio = portfolioGerente.obterTodasAsMusicas();

    res.render('portfolioIndex', { viewModel: portfolio, resultado: resultado });
};