var paginaGerente = require('./../app/gerentes/paginaGerente'),
    util = require('util');

exports.index = function (req, res) {
    var paginas = paginaGerente.obterTodas();

    res.render('paginaIndex', { viewModel: paginas });
};

exports.editar = function (req, res) {
    var idPagina = req.params.id;
    var pagina = paginaGerente.obterPorId(idPagina);

    res.render('paginaAlteracao', { viewModel: pagina });
};

exports.alterar = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };
    var idPagina = req.body.idPagina;

    try {
        var paginaAlterada = {
            id: idPagina,
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            texto: {
                paragrafos: []
            }
        };

        if (util.isArray(req.body.paragrafo)) {
            var paragrafos = req.body.paragrafo;
            for (var i = 0; i < paragrafos.length; i++) {
                paginaAlterada.texto.paragrafos.push({
                    descricao: paragrafos[i]
                });
            }
        } else {
            paginaAlterada.texto.paragrafos.push({
                descricao: req.body.paragrafo || ''
            });
        }

        paginaGerente.alterar(paginaAlterada);
        resultado.sucesso = true;
        resultado.mensagem = 'Textos alterados com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar texto: ' + error;
    }

    var pagina = paginaGerente.obterPorId(idPagina);

    res.render('paginaAlteracao', { viewModel: pagina, resultado: resultado });
};