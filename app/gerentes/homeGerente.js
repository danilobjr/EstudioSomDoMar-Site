var contexto = require('./contexto');

module.exports = paginaModel = function () {
    //var alterarTituloESubtitulo = function (idPagina, novoTitulo, novoSubtiulo) {
    //    var pagina = contexto.paginas.obterPorId(1);

    //    pagina.titulo = novoTitulo;
    //    pagina.subtitulo = novoSubtiulo;

    //    return pagina;
    //};

    var excluirBanner = function (idBanner) {
        var home = contexto.paginas.obterPorDescricao('Home');
        var position = undefined;

        for (var cont in home.banners) {
            if (home.banners[cont].id === idBanner) {
                position = cont;
            }
        }

        home.banners.splice(position, 1);

        return home;
    };

    return {
        //alterarTituloESubtitulo: alterarTituloESubtitulo,
        excluirBanner: excluirBanner
    };
} ();