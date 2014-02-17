$(function () {
    // validações

    var gerarErroRequired = function (e) {
        var haErros = false;
        var campo = $(e.currentTarget);

        if (campo.val() === '') {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorRequired').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorRequired').hide();
        }

        return haErros;
    };

    var gerarErroMinlength = function (e, minlength) {
        var haErros = false;
        var campo = $(e.currentTarget);

        if (campo.val() !== '' && campo.val().length < minlength) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorMinlength').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorMinlength').hide();
        }

        return haErros;
    };

    var gerarErroNomeArquivo = function (e) {
        var haErros = false;
        var campo = $(e.currentTarget);

        var regexp = /[a-zA-Z0-9\.\-\_]{1,}\.{1}[a-zA-Z0-9\.\-\_]{3,4}/;

        if (campo.val() !== '' && !regexp.test(campo.val())) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorNomeArquivo').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorNomeArquivo').hide();
        }

        return haErros;
    };

    // campos

    var campoSecao = $('[name=secao]');
    var campoNome = $('[name=nome]').focus();
    var campoArtista = $('[name=artista]');
    var campoArquivoMusica = $('[name=arquivoMusica]');
    var campoArquivoCapaAlbum = $('#campoImagem').find('[name=arquivoCapaAlbum]');
    var blocoImagemObrigatoria = $('#campoImagemObrigatorio');
    var campoArquivoCapaAlbumObrigatorio = blocoImagemObrigatoria.find('[name=arquivoCapaAlbum]');
    debugger;
    // eventos

    var verificarErrosDoCampoNome = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        return haErro;
    };

    var verificarErrosDoCampoArtista = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        return haErro;
    };

    var verificarErrosDoCampoArquivoMusica = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 5);
        }

        if (!haErro) {
            haErro = gerarErroNomeArquivo(e);
        }

        return haErro;
    };

    var verificarErrosDoCampoArquivoImagem = function (e) {
        var haErro = false;

        haErro = gerarErroMinlength(e, 5);

        if (!haErro) {
            haErro = gerarErroNomeArquivo(e);
        }

        return haErro;
    };

    var verificarErrosDoCampoArquivoImagemObrigatorio = function (e) {
        var haErro = false;

        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 5);
        }

        if (!haErro) {
            haErro = gerarErroNomeArquivo(e);
        }

        return haErro;
    };

    var modificarValidacaoImagemDeCapa = function (e) {
        var _this = $(e.currentTarget);

        var divDoCampoComum = $('#campoImagem');
        var divDoCampoObrigatorio = $('#campoImagemObrigatorio');

        if (_this.children(':selected').val() === 'lancamento' || _this.children(':selected').val() === 'pessoal') {
            divDoCampoObrigatorio.show();
            divDoCampoComum.hide();
        } else {
            divDoCampoObrigatorio.hide();
            divDoCampoComum.show();
        }
    };

    // Bind de eventos

    campoSecao.on('change', modificarValidacaoImagemDeCapa);
    campoNome.on('keyup', verificarErrosDoCampoNome);
    campoArtista.on('keyup', verificarErrosDoCampoArtista);
    campoArquivoMusica.on('keyup', verificarErrosDoCampoArquivoMusica);
    campoArquivoCapaAlbum.on('keyup', verificarErrosDoCampoArquivoImagem);
    campoArquivoCapaAlbumObrigatorio.on('keyup', verificarErrosDoCampoArquivoImagemObrigatorio);

    // disparar verificação de validação de campos no submit do form

    $("#formPortfolio").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoNome({ currentTarget: campoNome });
        if (haErros) { verificarErrosDoCampoArtista({ currentTarget: campoArtista }); } else { haErros = verificarErrosDoCampoArtista({ currentTarget: campoArtista }); }
        if (haErros) { verificarErrosDoCampoArquivoMusica({ currentTarget: campoArquivoMusica }); } else { haErros = verificarErrosDoCampoArquivoMusica({ currentTarget: campoArquivoMusica }); }

        var imagemEhObrigatorio = blocoImagemObrigatoria.is(':visible');

        if (imagemEhObrigatorio) {
            if (haErros) { verificarErrosDoCampoArquivoImagemObrigatorio({ currentTarget: campoArquivoCapaAlbumObrigatorio }); } else { haErros = verificarErrosDoCampoArquivoImagemObrigatorio({ currentTarget: campoArquivoCapaAlbumObrigatorio }); }
        } else {
            if (haErros) { verificarErrosDoCampoArquivoImagem({ currentTarget: campoArquivoCapaAlbum }); } else { haErros = verificarErrosDoCampoArquivoImagem({ currentTarget: campoArquivoCapaAlbum }); }
        }

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });
});