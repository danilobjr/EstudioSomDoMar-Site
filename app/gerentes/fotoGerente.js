var contexto = require('./../repository/contexto');

module.exports = function () {
    var obterTodasAsFotos = function () {
        return contexto.fotos.obterTodas();
    };

    var obterPorId = function (id) {
        return contexto.fotos.obterPorId(id);
    };

    var obterFotosPorSecao = function (secao) {
        return contexto.fotos.obterPorSecao(secao);
    };

    var obterPorTitulo = function (titulo) {
        return contexto.fotos.obterPorTitulo(titulo);
    };

    var incluir = function (novaFoto) {
        var fotoJahExiste = obterPorTitulo(novaFoto.titulo);

        if (fotoJahExiste) {
            throw new Error('Foto já existe');
        } else {
            return contexto.fotos.incluir(novaFoto);
        }
    };

    var alterar = function (fotoAlterada) {
        return contexto.fotos.alterar(fotoAlterada);
    };

    var excluirPorId = function (id) {
        var fotoExcluida = contexto.fotos.excluirPorId(id);

        if (!fotoExcluida) {
            throw new Error('Foto já excluída ou não encontrada');
        }

        return fotoExcluida;
    };

    return {
        obterTodas: obterTodasAsFotos,
        obterPorId: obterPorId,
        obterPorSecao: obterFotosPorSecao,
        incluir: incluir,
        alterar: alterar,
        excluirPorId: excluirPorId
    };
} ();