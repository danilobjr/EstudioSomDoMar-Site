var artistaGerente = require('./../app/gerentes/artistaGerente'),
    util = require('util');

exports.index = function (req, res) {
    var artistas = artistaGerente.obterTodos();
    res.render('artistaIndex', { viewModel: artistas });
};

exports.exibir = function (req, res) {
    var idArtista = req.params.id;
    var artista = artistaGerente.obterPorId(idArtista);

    res.render('artista', { _layoutFile: false, viewModel: artista});
};

exports.novo = function (req, res) {
    res.render('artistaNovo');
};

exports.incluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };
    
    try {
        var novoArtista = {
            nome: req.body.nome,
            site: req.body.site,
            email: req.body.email,
            telefones: [],
            redesSociais: []
        };

        if (util.isArray(req.body.telefone)) {
            var telefones = req.body.telefone;
            var tiposTelefone = req.body.tipoTelefone;
            for (var i = 0; i < telefones.length; i++) {
                novoArtista.telefones.push({
                    numero: telefones[i],
                    tipo: tiposTelefone[i]
                });
            }
        } else {
            novoArtista.telefones.push({
                numero: req.body.telefone,
                tipo: req.body.tipoTelefone
            });
        }

        if (util.isArray(req.body.redeSocial)) {
            var redesSociais = req.body.redeSocial;
            var tiposRedeSocial = req.body.tipoRedeSocial;
            for (var i = 0; i < redesSociais.length; i++) {
                novoArtista.redesSociais.push({
                    link: redesSociais[i],
                    tipo: tiposRedeSocial[i]
                });
            }
        } else {
            novoArtista.redesSociais.push({
                link: req.body.redeSocial,
                tipo: req.body.tipoRedeSocial
            });
        }

        var artistaCriado = artistaGerente.incluir(novoArtista);
        
        resultado.sucesso = true;
        resultado.mensagem = 'Artista incluído com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao incluir artista: ' + error;
    }

    var artistas = artistaGerente.obterTodos();

    res.render('artistaIndex', { viewModel: artistas, resultado: resultado });
};

exports.editar = function (req, res) {
    var idArtista = req.params.id;
    var artista = artistaGerente.obterPorId(idArtista);

    res.render('artistaAlteracao', { viewModel: artista });
};

exports.alterarDadosPessoais = function (req, res) {
    var idArtista = req.body.idArtista;
    var artistaAlterado = {};
    var resultado = { sucesso: false, mensagem: '' };
    
    try {
        artistaAlterado = {
            id: idArtista,
            nome: req.body.nome,
            site: req.body.site,
            email: req.body.email,
            telefones: [],
            redesSociais: []
        };
        
        if (util.isArray(req.body.telefone)) {
            var telefones = req.body.telefone;
            var tiposTelefone = req.body.tipoTelefone;
            for (var i = 0; i < telefones.length; i++) {
                artistaAlterado.telefones.push({
                    numero: telefones[i],
                    tipo: tiposTelefone[i]
                });
            }
        } else {
            artistaAlterado.telefones.push({
                numero: req.body.telefone,
                tipo: req.body.tipoTelefone
            });
        }

        if (util.isArray(req.body.redeSocial)) {
            var redesSociais = req.body.redeSocial;
            var tiposRedeSocial = req.body.tipoRedeSocial;
            for (var i = 0; i < redesSociais.length; i++) {
                if (redesSociais[i]) {
                    artistaAlterado.redesSociais.push({
                        link: redesSociais[i],
                        tipo: tiposRedeSocial[i]
                    });
                }
            }
        } else {
            artistaAlterado.redesSociais.push({
                link: req.body.redeSocial,
                tipo: req.body.tipoRedeSocial
            });
        }
        
        artistaAlterado = artistaGerente.alterarDadosPessoais(artistaAlterado);

        resultado.sucesso = true;
        resultado.mensagem = 'Artista alterado com sucesso';
    } catch (error) {
        artistaAlterado = artistaGerente.obterPorId(idArtista);
        resultado.mensagem = 'Erro ao alterar artista: ' + error;
    }

    res.render('artistaAlteracao', { viewModel: artistaAlterado, resultado: resultado });
};

exports.alterarMusicas = function (req, res) {
    var idArtista = req.body.idArtista,
        musicas = [],
        resultado = { sucesso: false, mensagem: '' };

    try {
        if (util.isArray(req.body.nomeMusica)) {
            var nomesDasMusicas = req.body.nomeMusica;
            var arquivosMusicas = req.body.nomeArquivoMusica;
            var arquivosImagensCD = req.body.nomeArquivoCapaAlbum;

            for (var i = 0; i < nomesDasMusicas.length; i++) {
                musicas.push({
                    nome: nomesDasMusicas[i],
                    arquivoMusica: arquivosMusicas[i],
                    arquivoCapaAlbum: arquivosImagensCD[i]
                });
            }
        } else {
            musicas.push({
                nome: req.body.nomeMusica,
                arquivoMusica: req.body.nomeArquivoMusica,
                arquivoCapaAlbum: req.body.nomeArquivoCapaAlbum
            });
        }

        artistaGerente.alterarMusicas(idArtista, musicas);
        resultado.sucesso = true;
        resultado.mensagem = 'Música(s) alterada(s) com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar música(s): ' + error;
    }

    var artistaAlterado = artistaGerente.obterPorId(idArtista);
    res.render('artistaAlteracao', { viewModel: artistaAlterado, resultado: resultado });
};

exports.alterarImagemPerfil = function (req, res) {
    var idArtista = req.body.idArtista,
        nomeArquivoImagemPerfil = req.body.imagemPerfil,
        resultado = { sucesso: false, mensagem: '' };

    try {
        artistaGerente.alterarNomeArquivoImagemPerfil(idArtista, nomeArquivoImagemPerfil);

        resultado.sucesso = true;
        resultado.mensagem = 'Imagem de perfil alterada com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar imagem de perfil: ' + error;
    }

    var artistaAlterado = artistaGerente.obterPorId(idArtista);

    res.render('artistaAlteracao', { viewModel: artistaAlterado, resultado: resultado });
};

exports.alterarBackground = function (req, res) {
    var idArtista = req.body.idArtista,
        corDeFundo = req.body.corFundo,
        nomeArquivoImagemBackground = req.body.imagemBackground,
        resultado = { sucesso: false, mensagem: '' };

    try {
        artistaGerente.alterarBackground(idArtista, corDeFundo, nomeArquivoImagemBackground);

        resultado.sucesso = true;
        resultado.mensagem = 'Background alterado com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar background: ' + error;
    }

    var artistaAlterado = artistaGerente.obterPorId(idArtista);
    res.render('artistaAlteracao', { viewModel: artistaAlterado, resultado: resultado });
};

exports.excluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        var artistaExcluido = artistaGerente.excluirPorId(req.params.id);

        resultado.sucesso = true;
        resultado.mensagem = 'Artista excluído com sucesso';
        //'Artista <b>' + artistaExcluido.nome + '</b> excluído com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao excluir artista: ' + error;
    }

    var artistas = artistaGerente.obterTodos();

    res.render('artistaIndex', { viewModel: artistas, resultado: resultado });
};