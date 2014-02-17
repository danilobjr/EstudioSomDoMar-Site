var contexto = require('./../repository/contexto');

module.exports = function () {
    //var obterTodos = function () {
    //    return contexto.artistas.obterTodos();
    //};

    //var obterPorNome = function (nome) {
    //    return contexto.artistas.obterPorNome(nome);
    //};

    var obterUsuario = function () {
        return contexto.usuario.obterUsuario();
    };

    var alterarDadosPessoais = function (artistaAlterado) {
        return contexto.usuario.alterarDadosPessoais(artistaAlterado);
    };

    //var incluir = function (novoArtista) {
    //    var artistaJahExiste = obterPorNome(novoArtista.nome);
    //    
    //    if (artistaJahExiste) {
    //        throw new Error('Artista já existe');
    //    } else {

    //        // propriedades padrão na criação de um novo artista
    //        novoArtista.imagens = {
    //            background: {
    //                cor: '#ffffff'
    //            }
    //        };
    //        
    //        return contexto.artistas.incluir(novoArtista);
    //    }
    //};

    //var alterarMusicas = function (idArtista, musicas) {
    //    return contexto.artistas.alterarMusicas(idArtista, musicas);
    //};

    //var alterarNomeArquivoImagemPerfil = function (idArtista, nomeArquivoImagemPerfil) {
    //    return contexto.artistas.alterarNomeArquivoImagemPerfil(idArtista, nomeArquivoImagemPerfil);
    //};

    //var alterarBackground = function (idArtista, corDeFundo, nomeArquivoImagemBackground) {
    //    return contexto.artistas.alterarBackground(idArtista, corDeFundo, nomeArquivoImagemBackground);
    //};

    //var excluirPorId = function (id) {
    //    var artistaExcluido = contexto.artistas.excluirPorId(id);

    //    if (!artistaExcluido) {
    //        throw new Error('Artista já excluído ou não encontrado');
    //    }

    //    return artistaExcluido;
    //};

    return {
        //obterTodos: obterTodos,
        obterUsuario: obterUsuario,
        //incluir: incluir,
        alterarDadosPessoais: alterarDadosPessoais,
        //alterarMusicas: alterarMusicas,
        //alterarNomeArquivoImagemPerfil: alterarNomeArquivoImagemPerfil,
        //alterarBackground: alterarBackground,
        //excluirPorId: excluirPorId
    };
} ();