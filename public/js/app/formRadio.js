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

    var campoDescricao = $('[name=descricao]').focus();
    var campoArquivoMusica = $('[name=arquivoMusica]');

    // eventos

    var verificarErrosDoCampoDescricao = function (e) {
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

    campoDescricao.on('keyup', verificarErrosDoCampoDescricao);
    campoArquivoMusica.on('keyup', verificarErrosDoCampoArquivoMusica);

    // disparar verificação de validação de campos no submit do form

    $("#formRadio").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoDescricao({ currentTarget: campoDescricao });
        if (haErros) { verificarErrosDoCampoArquivoMusica({ currentTarget: campoArquivoMusica }); } else { haErros = verificarErrosDoCampoArquivoMusica({ currentTarget: campoArquivoMusica }); }

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });
});