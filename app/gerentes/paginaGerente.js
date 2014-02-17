var contexto = require('./../repository/contexto');

module.exports = function () {
    var obterTodasAsPaginas = function () {
        return contexto.paginas.obterTodas();
    };

    var obterPaginaPorId = function (id) {
        return contexto.paginas.obterPorId(id);
    };

    var obterPaginaPorDescricao = function (descricao) {
        return contexto.paginas.obterPorDescricao(descricao);
    };

    var alterar = function (paginaAlterada) {
        paginaAlterada.titulo = (paginaAlterada.titulo) ? paginaAlterada.titulo : '';
        paginaAlterada.subtitulo = (paginaAlterada.subtitulo) ? paginaAlterada.subtitulo : '';
        paginaAlterada.texto.paragrafos = (paginaAlterada.texto.paragrafos.length) ? paginaAlterada.texto.paragrafos : { paragrafo: [] };

        return contexto.paginas.alterar(paginaAlterada);
    };

    return {
        obterTodas: obterTodasAsPaginas,
        obterPorId: obterPaginaPorId,
        obterPorDescricao: obterPaginaPorDescricao,
        alterar: alterar
    };
} ();