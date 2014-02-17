var contexto = require('./../repository/contexto');

module.exports = paginaModel = function () {
    var alterarTitulo = function (novoTitulo) {
        var pagina = contexto.paginas.obterPorDescricao('Admin');

        //throw new Error('adminIndexGerente.alterarTitulo: página Admin não encontrada');

        if (pagina) {
            pagina.titulo = novoTitulo;
            return pagina;
        }
    };

    var obterViewModel = function () {
        return contexto.paginas.obterPorDescricao('Admin');
    };

    return {
        alterarTitulo: alterarTitulo,
        obterViewModel: obterViewModel
    };
} ();